import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { compose } from 'redux';
import { connect } from 'react-redux';
import * as actions from 'actions';

class SignUp extends Component {
  onSubmit = (formProps) => {
    const { signUp, history: h } = this.props;
    signUp(formProps, () => h.push('/dashboard'));
  }

  render() {
    const { handleSubmit, auth } = this.props;

    return (
      <form onSubmit={handleSubmit(this.onSubmit)}>
        <Field
          name="email"
          type="text"
          component="input"
          autoComplete="none"
          placeholder="Email"
        />

        <Field
          name="password"
          type="password"
          component="input"
          autoComplete="none"
          placeholder="Senha"
        />

        <sub>{auth.errorMessage}</sub>

        <button className="mt1 button" type="submit">Sign Up</button>
      </form>
    );
  }
}

function mapStateToProps({ auth }) {
  return { auth };
}

export default compose(
  connect(mapStateToProps, actions),
  reduxForm({ form: 'signup' }),
)(SignUp);
