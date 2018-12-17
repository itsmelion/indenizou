/* eslint-disable jsx-a11y/no-autofocus */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import './SignUp.scss';

class SignUp extends PureComponent {
  // constructor (props) {
  //   super(props);
  //   this.state = {};
  // }
  handleRadio () {

  }

  render () {
    const { url, className, compact } = this.props;
    const isCompact = compact ? 'compact' : false;

    return (
      <form
        autoComplete="on"
        action={url}
        method="post"
        className={`form ${ className } ${ isCompact }`}
      >
        <h4 className="mb1">
          😨 Conta pra gente o que aconteceu.
          <br />
          Daí, é só ligar o piloto automático ;)
          <br />
          🛬🛫✈️🛩✈︎
        </h4>


        <label className="input" htmlFor="email">
          <span>e-mail</span>
          <input
            autoFocus
            autoComplete="email"
            type="email"
            name="email"
            id="email"
            placeholder="fulana@email.com"
          />
        </label>

        <fieldset className="radio-group">
          <label htmlFor="bagagem">
            <span>Bagagem</span>
            <input type="radio" name="bagagem" id="bagagem" />
          </label>

          <label htmlFor="atraso">
            <span>Atraso</span>
            <input type="radio" name="atraso" id="atraso" defaultChecked />
          </label>

          <label htmlFor="cancelamento">
            <span>Cancelamento</span>
            <input type="radio" name="cancelamento" id="cancelamento" />
          </label>
        </fieldset>

        <button className="button default" type="submit">Quero minha indenização!</button>
      </form>
    );
  }
}

SignUp.propTypes = {
  url: PropTypes.string,
  compact: PropTypes.bool,
  className: PropTypes.string,
};

SignUp.defaultProps = {
  url: 'https://api.alia.ml/indenizou/leads',
  className: '',
  compact: false,
};

export default SignUp;
