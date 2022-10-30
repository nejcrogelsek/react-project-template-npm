import AuthenticatedRouter from 'pages/Router/AuthenticatedRouter'
import UnauthenticatedRouter from 'pages/Router/UnauthenticatedRouter'
import { FC } from 'react'
import { useAppSelector } from 'store/app/hooks'

const Router: FC = () => {
  const isAuthenticated = useAppSelector((state) => state.auth.user?.token)

  return isAuthenticated ? <AuthenticatedRouter /> : <UnauthenticatedRouter />
}

export default Router
