import LoadingProvider from 'components/providers/LoadingProvider/LoadingProvider'
import { observer } from 'mobx-react'
import { FC, lazy, Suspense } from 'react'
import { Route, RouteProps, Routes as Switch } from 'react-router-dom'

import PrivateRoute from './PrivateRoute'
import RestrictedRoute from './RestrictedRoute'

export enum RouteType {
  PUBLIC,
  PRIVATE,
  RESTRICTED,
}

interface AppRoute extends RouteProps {
  type?: RouteType
}

/* Public routes */
const Home = lazy(() => import('pages/Home/Home'))
const Atoms = lazy(() => import('pages/Atoms/Atoms'))

/* Private routes */
const Profile = lazy(() => import('pages/Profile/Profile'))

/* Restricted routes */
const Login = lazy(() => import('pages/Login/Login'))
const Register = lazy(() => import('pages/Register/Register'))
const ForgotPassword = lazy(() => import('pages/ForgotPassword/ForgotPassword'))
const ResetPassword = lazy(() => import('pages/ResetPassword/ResetPassword'))

/* Error routes */
const Error = lazy(() => import('pages/Error/Error'))
const Page404 = lazy(() => import('pages/Page404/Page404'))

export const AppRoutes: AppRoute[] = [
  // Restricted Routes
  {
    type: RouteType.RESTRICTED,
    path: 'login',
    children: <Login />,
  },
  {
    type: RouteType.RESTRICTED,
    path: 'signup',
    children: <Register />,
  },
  {
    type: RouteType.RESTRICTED,
    path: 'forgot-password',
    children: <ForgotPassword />,
  },
  {
    type: RouteType.RESTRICTED,
    path: 'reset-password',
    children: <ResetPassword />,
  },
  // Private Routes
  {
    type: RouteType.PRIVATE,
    path: 'my-profile',
    children: <Profile />,
  },
  // Public Routes
  {
    type: RouteType.PUBLIC,
    path: '/',
    children: <Home />,
  },
  {
    type: RouteType.PUBLIC,
    path: '/atoms',
    children: <Atoms />,
  },
  // 404 Error
  {
    type: RouteType.PUBLIC,
    path: '/error',
    children: <Error />,
  },
  {
    type: RouteType.PUBLIC,
    path: '*',
    children: <Page404 />,
  },
]

const Routes: FC = () => {
  return (
    <Suspense fallback={<LoadingProvider loading={true} />}>
      <Switch>
        {AppRoutes.map((r) => {
          const { type } = r
          if (type === RouteType.PRIVATE) {
            return <Route key={`${r.path}`} path={`/${r.path}`} element={<PrivateRoute>{r.children}</PrivateRoute>} />
          }
          if (type === RouteType.RESTRICTED) {
            return (
              <Route key={`${r.path}`} path={`/${r.path}`} element={<RestrictedRoute>{r.children}</RestrictedRoute>} />
            )
          }

          return <Route key={`${r.path}`} path={`/${r.path}`} element={r.children} />
        })}
        <Route path="*" element={<Page404 />} />
      </Switch>
    </Suspense>
  )
}

export default observer(Routes)
