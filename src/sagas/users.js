import { takeEvery, takeLatest, take, call, fork, put } from 'redux-saga/effects';
import * as actions from '../actions/users';
import * as api from '../api/users';

// GET USERS SAGAS

function* getUsers() {
  try {
    const result = yield call(api.getUsers);
    yield put(actions.getUsersSuccess({ items: result.data.data }));
  } catch (error) {
    yield put(actions.usersError({ error: 'An error occured when trying to get the users' }));
  }
}

function* watchGetUsersRequest() {
  yield takeEvery(actions.Types.GET_USERS_REQUEST, getUsers);
}

// CREATE USER SAGAS 

function* createUser(action) {
  console.log(action);
  try {
    yield call(api.createUser, action.payload); // arguments to api.createUser are passed as a second argument to this yield call 
    yield call(getUsers);
  } catch (error) {
    yield put(actions.usersError({ error: 'An error occured when trying to create the user' }));
  }
}

function* watchCreateUserRequest() {
  yield takeLatest(actions.Types.CREATE_USER_REQUEST, createUser);
}

// DELETE USER SAGAS 

function* deleteUser({userId}) {
  try {
    yield call(api.deleteUser, userId); // arguments to api.deleteUser are passed as a second argument to this yield call 
    yield call(getUsers);
  } catch (error) {
    yield put(actions.usersError({ error: 'An error occured when trying to delete the user' }));
  }
}

function* watchDeleteUserRequest() {
  while(true) { // the loop can't be re-entered and watch new delete user requests until all yields have been resolved 
    const action = yield take(actions.Types.DELETE_USER_REQUEST); // the worker saga can't be passed as an argument to a lower lever effect like 'take'
    yield call(deleteUser, { userId: action.payload.userId });
  }
}

//-------------------------------//

const usersSagas = [
  fork(watchGetUsersRequest),
  fork(watchCreateUserRequest),
  fork(watchDeleteUserRequest)
];

export default usersSagas;