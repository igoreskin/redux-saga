import React from 'react';
import { connect } from 'react-redux';
import { getUsersRequest } from '../actions/users';
import UsersList from './UsersList';

const App = (props) => {

  props.getUsersRequest();

  const users = props.users;

  return (
    <div style={{ margin: '0 auto', padding: '20px', maxWidth: '600px' }}>
      <UsersList users={users.items} />
    </div>
  );
}

export default connect(({users}) => ({users}), {getUsersRequest})(App);
