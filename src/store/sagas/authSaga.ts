import { AxiosResponse } from 'axios'
import instance from 'axios'
import { apiRoutes } from 'constants/apiConstants'
import { routes } from 'constants/routesConstants'
import { push } from 'redux-first-history'
import { put } from 'redux-saga/effects'

import { login, loginSuccess } from '../actions/authActions'
import { addError, setGlobalLoading } from '../features/globalSlice'
import { User } from '../models/Auth'
import { IError } from '../models/Global'

export function* AuthLoginSaga(action: ReturnType<typeof login>): Generator {
  yield put(setGlobalLoading(true))
  try {
    const response = (yield instance.post(
      `${apiRoutes.LOGIN}`,
      {
        ...action.payload,
      },
      {},
    )) as AxiosResponse<User>
    yield put(loginSuccess({ ...response.data, email: action.payload.email }))
    yield put(push(routes.HOME))
  } catch (e) {
    const error = e as IError
    yield put(
      addError({
        actionType: action.type,
        error: error.response?.data.error ?? error.message,
      }),
    )
  } finally {
    yield put(setGlobalLoading(false))
  }
}
