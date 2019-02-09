import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

export default (ChildComponent) => {
  class ComposedComponent extends PureComponent {
    componentDidMount() {
      this.shouldNavigateAway();
    }

    componentDidUpdate() {
      this.shouldNavigateAway();
    }

    shouldNavigateAway() {
      const { auth, history } = this.props;
      if (!auth) history.push('/');
    }

    render() {
      const { auth } = this.props;
      if (!auth) return null;
      return <ChildComponent {...this.props} />;
    }
  }

  function mapStateToProps({ auth }) {
    return { auth: auth.authenticated };
  }

  return connect(mapStateToProps)(ComposedComponent);
};
