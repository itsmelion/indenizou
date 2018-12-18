/* eslint-disable jsx-a11y/no-autofocus */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import './SignUp.scss';

const problems = [
  'cancelamento', 'atraso', 'Extravio de Bagagem', 'outros',
];

let options = {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  mode: 'cors',
  cache: 'default',
};

class SignUp extends PureComponent {
  constructor (props) {
    super(props);
    this.email = React.createRef();
    this.phone = React.createRef();
  }

  state = { problema: 'atraso' };

  handleRadio = e => this.setState(({ problema: e.target.value }));

  handleSubmit = e => {
    const { url } = this.props;
    const { problema } = this.state;
    e.preventDefault();

    options = Object.assign(options, {
      body: JSON.stringify({
        email: this.email.current.value,
        phone: this.phone.current.value,
        problema,
      }),
    });

    fetch(url, options)
      .then(r => console.log('posted!', r));
  };

  render () {
    const { className, compact } = this.props;
    const { problema } = this.state;
    const isCompact = compact ? 'compact' : false;

    return (
      <form
        autoComplete="on"
        onSubmit={this.handleSubmit}
        className={`form ${ className } ${ isCompact }`}
      >
        <h4 className="mb1">
          <span role="img" aria-label="preocupado">😨</span>
          <br />
          Conta pra gente o que aconteceu.
          <br />
          Daí, é só ligar o piloto automático
          <span role="img" aria-label="avião">🛬🛫✈️🛩</span>
        </h4>

        <label className="input" htmlFor="email">
          <span>e-mail</span>
          <input
            autoFocus
            autoComplete="email"
            type="email"
            name="email"
            id="email"
            ref={this.email}
            placeholder="fulana@email.com"
            required
          />
        </label>

        <label className="input" htmlFor="phone">
          <span>Telefone (whatsapp)</span>
          <input
            autoComplete="tel"
            pattern="[0-9]"
            type="tel"
            name="phone"
            minLength="9"
            maxLength="14"
            id="phone"
            ref={this.phone}
            placeholder="+55 31 9 8287-5204"
            list="defaultTels"
          />

          <datalist id="defaultTels">
            <option value="+55 31 9 8888-8888" />
          </datalist>
        </label>

        <fieldset className="radio-group">
          {problems.map(problem => (
            <label key={problem} htmlFor={problem} className={(problema === problem).toString()}>
              <span>{problem}</span>
              <input
                type="radio"
                name={problem}
                id={problem}
                value={problem}
                checked={problema === problem}
                onChange={this.handleRadio}
              />
            </label>
          ))}
        </fieldset>

        <button className="button primary" type="submit">Quero minha indenização!</button>
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
