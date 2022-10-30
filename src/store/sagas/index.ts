import { all, takeLatest } from 'redux-saga/effects'

import { login } from '../actions/authActions'
import { AuthLoginSaga } from './authSaga'

export function* watchAll(): Generator {
  yield all([takeLatest(login.type, AuthLoginSaga)])
}
