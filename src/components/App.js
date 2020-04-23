import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Alert } from 'reactstrap';
import { getUsersRequest, createUserRequest, deleteUserRequest, usersError } from '../actions/users';
import UsersList from './UsersList';
import NewUserForm from './NewUserForm';

const App = (props) => {

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {props.getUsersRequest()}, []);

  const handleSubmit = (form) => {
    console.log(form);
    props.createUserRequest(form);
  };

  const handleDeleteUserClick = (userId) => {
    props.deleteUserRequest(userId);
  };

  const handleCloseAlert = () => {
    props.usersError({ error: '' });
  };

  const users = props.users;

  return (
    <div style={{ margin: '0 auto', padding: '20px', maxWidth: '600px' }}>
      <Alert color="danger" isOpen={!!props.users.error} toggle={handleCloseAlert}> {/* with !! an empty string evaluates to false */}
        {props.users.error}
      </Alert>
      <NewUserForm onSubmit={handleSubmit} />
      <UsersList users={users.items} onDeleteUser={handleDeleteUserClick} />
    </div>
  );
}

export default connect(({users}) => ({users}), {getUsersRequest, createUserRequest, deleteUserRequest, usersError})(App);
