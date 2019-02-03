import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { compose } from 'redux';
import { connect } from 'react-redux';
import * as actions from 'actions';

class Signin extends Component {
  onSubmit = (formProps) => {
    const { signIn, history: h } = this.props;
    signIn(formProps, () => h.push('/dashboard'));
  };

  render() {
    const { handleSubmit, errorMessage } = this.props;

    return (
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
        <sub>{errorMessage}</sub>

        <button type="submit">Sign In</button>
      </form>
    );
  }
}

function mapStateToProps(state) {
  return { errorMessage: state.auth.errorMessage };
}

export default compose(
  connect(mapStateToProps, actions),
  reduxForm({ form: 'signin' }),
)(Signin);
