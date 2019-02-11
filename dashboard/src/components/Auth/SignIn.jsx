import React, { PureComponent } from 'react';
import { Redirect } from 'react-router';
import { reduxForm, Field } from 'redux-form';
import { compose } from 'redux';
import { connect } from 'react-redux';
import * as actions from 'actions';
import Logo from './Logo';

class SignIn extends PureComponent {
  onSubmit = (formProps) => {
    const { signIn } = this.props;
    signIn(formProps, null);
  };

  render() {
    const { handleSubmit, auth } = this.props;

    if (auth.authenticated) return <Redirect to="/dashboard" />;

    return (
      <section className="Auth-common SignIn">
        <form onSubmit={handleSubmit(this.onSubmit)}>
          {Logo}

          <Field
            id="email"
            name="email"
            type="email"
            component="input"
            autoComplete="email"
            placeholder="Email" />

          <Field
            id="password"
            placeholder="Senha"
            name="password"
            type="password"
            component="input"
            autoComplete="password" />

          <sub>{auth.errorMessage}</sub>

          <button className="mt1 button" type="submit">Sign In</button>
        </form>
      </section>
    );
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default compose(
  connect(mapStateToProps, actions),
  reduxForm({ form: 'signin' }),
)(SignIn);
