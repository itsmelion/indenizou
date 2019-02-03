import React, { PureComponent } from 'react';
import { Redirect } from 'react-router';
import { reduxForm, Field } from 'redux-form';
import { compose } from 'redux';
import { connect } from 'react-redux';
import * as actions from 'actions';

class SignIn extends PureComponent {
  onSubmit = (formProps) => {
    const { signIn, history: h } = this.props;
    signIn(formProps, () => h.push('/dashboard'));
  };

  render() {
    const { handleSubmit, auth } = this.props;

    if (auth.authenticated) return <Redirect to="/dashboard" />;

    return (
      <section className="Auth-common SignIn">
        <form onSubmit={handleSubmit(this.onSubmit)}>
          <fieldset>
            <label htmlFor="email">Email</label>
            <Field
              id="email"
              name="email"
              type="text"
              component="input"
              autoComplete="none"
            />
          </fieldset>

          <fieldset>
            <label htmlFor="password">Password</label>
            <Field
              id="password"
              name="password"
              type="password"
              component="input"
              autoComplete="none"
            />
          </fieldset>
          <sub>{auth.errorMessage}</sub>

          <button type="submit">Sign In</button>
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
