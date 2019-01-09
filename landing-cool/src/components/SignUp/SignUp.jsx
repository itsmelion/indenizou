/* eslint-disable jsx-a11y/no-autofocus */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import Network from 'network';
import SelectIssue from 'components/SelectIssue/SelectIssue';
import SocialLogin from 'components/SocialLogin/SocialLogin';
import ThankYou from './ThankYou';
import './SignUp.scss';

class SignUp extends PureComponent {
  constructor (props) {
    super(props);
    this.email = React.createRef();
    this.phone = React.createRef();
    this.description = React.createRef();
  }

  state = { problema: 'atraso', submitted: false };

  handleRadio = e => this.setState(({ problema: e.target.value }));

  handleSubmit = e => {
    const { url } = this.props;
    const { problema } = this.state;
    e.preventDefault();

    const data = {
      EMAIL: this.email.current.value,
      PHONE: this.phone.current.value,
      ASSUNTO: problema,
      OUTROS: (this.description.current && this.description.current.value) || null,
      CONTACTBY: 'email',
    };

    Network.post(url, data)
      .then(() => this.setState(({ submitted: true })))
      .catch(() => this.setState(({ submitted: true })))
      .finally(() => setTimeout(() => this.setState(({ submitted: false })), 4000));
  };

  render () {
    const { className, compact } = this.props;
    const { problema, submitted } = this.state;
    const isCompact = compact ? 'compact' : false;

    if (submitted) return ThankYou;

    return (
      <form
        autoComplete="on"
        onSubmit={this.handleSubmit}
        className={`form ${ className } ${ isCompact }`}
      >
        <h4 className="mb1">
          Sua indenização <b>grátis</b> e sem burocracia
        </h4>

        {SocialLogin}

        <label className="input" htmlFor="email">
          <span>e-mail</span>
          <input
            autoFocus
            autoComplete="email"
            type="email"
            name="EMAIL"
            id="email"
            ref={this.email}
            placeholder="fulana@email.com"
            required
          />
        </label>

        <label className="input" htmlFor="phone">
          <span><FontAwesomeIcon icon={faWhatsapp} />&nbsp;Telefone </span>
          <input
            autoComplete="tel"
            type="tel"
            name="PHONE"
            minLength="9"
            maxLength="18"
            id="phone"
            ref={this.phone}
            placeholder="31 9 8287-5204"
            list="defaultTels"
          />

          <datalist id="defaultTels">
            <option value="31911110000" />
          </datalist>
        </label>

        <SelectIssue handler={this.handleRadio} selected={problema} />

        {problema === 'outros' && (
          <label className="input" htmlFor="description">
            <span><span role="img" aria-label="preocupado">😨</span>
          &nbsp;Conta pra gente o que aconteceu.</span>
            <textarea
              autoComplete="off"
              name="OUTROS"
              id="description"
              ref={this.description}
            />
          </label>
        )}

        <input value="Quero minha indenização!" name="subscribe" className="button primary" type="submit" />
      </form>
    );
  }
}

SignUp.propTypes = {
  url: PropTypes.string,
  className: PropTypes.string,
  compact: PropTypes.bool,
};

SignUp.defaultProps = {
  url: 'https://api.alia.ml/indenizou/leads',
  className: '',
  compact: false,
};

export default SignUp;
