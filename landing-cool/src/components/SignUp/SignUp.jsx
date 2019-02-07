/* eslint-disable jsx-a11y/no-autofocus, jsx-a11y/label-has-associated-control, jsx-a11y/label-has-for */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import PhoneInput from 'react-phone-number-input';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import axios from 'axios';
import SelectIssue from 'components/SelectIssue/SelectIssue';
import SocialLogin from 'components/SocialLogin/SocialLogin';
import ThankYou from './ThankYou';
import './SignUp.scss';

class SignUp extends PureComponent {
  constructor (props) {
    super(props);
    this.email = React.createRef();
    this.description = React.createRef();
    this.name = '';
    this.profilePicture = '';
  }

  state = {
    problema: 'atraso',
    phone: '',
    submitted: false,
    contactby: false,
  };

  handleContactBy = () => this.setState(({ contactby }) => ({ contactby: !contactby }));
  handlePhone = phone => this.setState({ phone });
  handleRadio = e => this.setState(({ problema: e.target.value }));

  handleSocialLogin = ({ _profile: u }) => {
    console.log(u);
    this.email.current.value = u.email;
    this.name = u.name;
    if (u.profilePicURL) this.profilePicture = u.profilePicURL;
    if (u.phone) this.handlePhone(u.phone);
  }

  handleSubmit = e => {
    const { url } = this.props;
    const { problema, contactby, phone } = this.state;
    e.preventDefault();

    const data = {
      EMAIL: this.email.current.value,
      PHONE: phone,
      ASSUNTO: problema,
      OUTROS: (this.description.current && this.description.current.value) || null,
      CONTACTBY: contactby ? 'whatsapp' : 'email',
      NAME: this.name,
    };

    if (this.profilePicture) data.profilePicture = this.profilePicture;

    axios.post(url, data)
      .then(() => this.setState(({ submitted: true })))
      .catch(() => this.setState(({ submitted: true })))
      .finally(() => setTimeout(() => this.setState(({ submitted: false })), 4000));
  };

  render () {
    const { className, compact } = this.props;
    const { problema, submitted, contactby, phone } = this.state;
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

        <SocialLogin
          handleSocialLogin={this.handleSocialLogin}
          contactbyHandler={this.handleContactBy}
          contactby={contactby}
        />

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

        <label className={`input phone-${ contactby }`} htmlFor="phone">
          <span><FontAwesomeIcon icon={faWhatsapp} />&nbsp;Telefone </span>
          <PhoneInput
            country="BR"
            displayInitialValueAsLocalNumber
            autoComplete="tel"
            national="true"
            international={false}
            showCountrySelect={false}
            name="PHONE"
            placeholder="31 92222 2222"
            minLength="11"
            maxLength="15"
            id="phone"
            type="tel"
            onChange={this.handlePhone}
            required={contactby}
          />
        </label>

        <SelectIssue handler={this.handleRadio} selected={problema} />

        {problema === 'outros' && (
          <label className="input" htmlFor="description">
            <span>
              <span role="img" aria-label="preocupado">😨</span>
              &nbsp;Conta pra gente o que aconteceu.
            </span>

            <textarea
              autoComplete="off"
              name="OUTROS"
              id="description"
              ref={this.description}
            />
          </label>
        )}

        <input
          value="Quero minha indenização!"
          name="subscribe"
          className={`button primary ${ contactby && !phone }`}
          type="submit"
          disabled={contactby && !phone}
        />
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
  url: 'https://api.indenizou.alia.ml/subscribe',
  className: '',
  compact: false,
};

export default SignUp;
