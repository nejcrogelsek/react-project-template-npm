import LoadingProvider from 'components/providers/LoadingProvider/LoadingProvider'
import { routes } from 'constants/routesConstants'
import { FC, lazy, Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'

/* Public routes */
const Home = lazy(() => import('pages/Home/Home'))
const Atoms = lazy(() => import('pages/Atoms/Atoms'))

/* Restricted routes */
const Login = lazy(() => import('pages/Login/Login'))
const Register = lazy(() => import('pages/Register/Register'))
const ForgotPassword = lazy(() => import('pages/ForgotPassword/ForgotPassword'))
const ResetPassword = lazy(() => import('pages/ResetPassword/ResetPassword'))

/* Error routes */
const Error = lazy(() => import('pages/Error/Error'))
const PageNotFound = lazy(() => import('pages/PageNotFound/PageNotFound'))

const UnauthenticatedRouter: FC = () => {
  return (
    <Suspense fallback={<LoadingProvider loading={true} />}>
      <Routes>
        <Route path={routes.LOGIN} element={<Login />} />
        <Route path={routes.SIGNUP} element={<Register />} />
        <Route path={routes.FORGOT_PASSWORD} element={<ForgotPassword />} />
        <Route path={routes.RESET_PASSWORD} element={<ResetPassword />} />
        <Route path={routes.ERROR} element={<Error />} />
        <Route path={routes.ATOMS} element={<Atoms />} />
        <Route path={routes.HOME} element={<Home />} />
        <Route path={routes.PAGE_NOT_FOUND} element={<PageNotFound />} />
        <Route path={'*'} element={<Navigate to={routes.HOME} />} />
      </Routes>
    </Suspense>
  )
}

export default UnauthenticatedRouter
