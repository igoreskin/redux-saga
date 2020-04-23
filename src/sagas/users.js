import { takeEvery, takeLatest, call, fork, put } from 'redux-saga/effects';
import * as actions from '../actions/users';
import * as api from '../api/users';

// GET USERS SAGAS

function* getUsers() {
  try {
    const result = yield call(api.getUsers);
    yield put(actions.getUsersSuccess({ items: result.data.data }));
  } catch (error) {
    
  }
}

function* watchGetUsersRequest() {
  yield takeEvery(actions.Types.GET_USERS_REQUEST, getUsers);
}

// CREATE USER SAGAS 

function* createUser(action) {
  console.log(action);
  try {
    yield call(api.createUser, action.payload);
    yield call(getUsers);
  } catch (error) {
    
  }
}

function* watchCreateUserRequest() {
  yield takeLatest(actions.Types.CREATE_USER_REQUEST, createUser);
}

//-------------------------------//

const usersSagas = [
  fork(watchGetUsersRequest),
  fork(watchCreateUserRequest)
];

export default usersSagas;