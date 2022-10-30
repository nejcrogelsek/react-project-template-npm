import * as API from 'api/Api'
import { useRouter } from 'lib/hooks/useRouter'
import { FC } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from 'store/app/hooks'
import { addSnackbar, setGlobalLoading } from 'store/features/globalSlice'
import { SnackbarType } from 'store/models/Snackbar'

import { ErrorPage } from './styles'

const Error: FC = () => {
  const snackbars = useAppSelector((state) => state.global.snackbars)
  const dispatch = useAppDispatch()
  const { navigate } = useRouter()
  const [searchParams] = useSearchParams()

  const error = searchParams.get('error')?.replaceAll('"', '')
  const errorCode = searchParams.get('errorCode')?.replaceAll('"', '')
  const errorName = searchParams.get('errorName')?.replaceAll('"', '')
  const errorMessage = searchParams.get('errorMessage')?.replaceAll('"', '')
  const description = searchParams.get('description')?.replaceAll('"', '')
  const token = searchParams.get('token')?.replaceAll('"', '')

  const resendEmailVerification = async () => {
    dispatch(setGlobalLoading(true))
    const res = await API.resendEmailVerification(token as string)
    dispatch(setGlobalLoading(true))
    if (res.error) {
      dispatch(
        addSnackbar({
          id: `error-${snackbars.length}`,
          type: SnackbarType.ERROR,
          title: res.message,
        }),
      )
    } else {
      navigate('/', { state: { onSuccess: 'Check your inbox and verify your account.' } })
    }
  }

  return (
    <ErrorPage>
      <div className="content">
        <h1>
          <span>{errorCode as string}</span>
          {error as string}
        </h1>
        <p>{errorMessage as string}</p>
        <p>{description as string}</p>
        {(errorName as string) === 'EMAIL_VERIFICATION' ? (
          <button onClick={resendEmailVerification}>Verify email</button>
        ) : (errorName as string) === 'RESET_PASSWORD' ? (
          <Link to="/forgot-password">Forgot password</Link>
        ) : null}
      </div>
    </ErrorPage>
  )
}

export default Error
