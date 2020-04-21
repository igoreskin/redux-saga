import React from 'react';
import { connect } from 'react-redux';
import { getUsersRequest } from '../actions/users';

const App = (props) => {

  props.getUsersRequest();

  return (
    <div>
      test
    </div>
  );
}

export default connect(null, {
  getUsersRequest
})(App);
