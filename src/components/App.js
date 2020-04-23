import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getUsersRequest, createUserRequest } from '../actions/users';
import UsersList from './UsersList';
import NewUserForm from './NewUserForm';

const App = (props) => {

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {props.getUsersRequest()}, []);

  const handleSubmit = (form) => {
    console.log(form);
    props.createUserRequest(form);
  }

  const users = props.users;

  return (
    <div style={{ margin: '0 auto', padding: '20px', maxWidth: '600px' }}>
      <NewUserForm onSubmit={handleSubmit} />
      <UsersList users={users.items} />
    </div>
  );
}

export default connect(({users}) => ({users}), {getUsersRequest, createUserRequest})(App);
