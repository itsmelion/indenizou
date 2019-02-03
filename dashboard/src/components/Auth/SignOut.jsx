import { connect } from 'react-redux';
import * as actions from 'actions';

const SignOut = ({ signOut, history: h }) => {
  signOut();
  h.push('/signin');

  return null;
};

export default connect(null, actions)(SignOut);
