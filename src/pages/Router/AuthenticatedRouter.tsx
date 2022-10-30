import LoadingProvider from 'components/providers/LoadingProvider/LoadingProvider'
import { routes } from 'constants/routesConstants'
import { FC, lazy, Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'

/* Public routes */
const Home = lazy(() => import('pages/Home/Home'))
const Atoms = lazy(() => import('pages/Atoms/Atoms'))

/* Private routes */
const Profile = lazy(() => import('pages/Profile/Profile'))

/* Error routes */
const Error = lazy(() => import('pages/Error/Error'))
const PageNotFound = lazy(() => import('pages/PageNotFound/PageNotFound'))

const AuthenticatedRouter: FC = () => {
  return (
    <Suspense fallback={<LoadingProvider loading={true} />}>
      <Routes>
        <Route path={routes.ERROR} element={<Profile />} />
        <Route path={routes.ERROR} element={<Error />} />
        <Route path={routes.ATOMS} element={<Atoms />} />
        <Route path={routes.HOME} element={<Home />} />
        <Route path={routes.PAGE_NOT_FOUND} element={<PageNotFound />} />
        <Route path={'*'} element={<Navigate to={routes.HOME} />} />
        <Route path={'*'} element={<Navigate to={routes.PAGE_NOT_FOUND} />} />
      </Routes>
    </Suspense>
  )
}

export default AuthenticatedRouter
