import authStore from 'lib/stores/auth.store'
import { observer } from 'mobx-react'
import { FC } from 'react'
import { Navigate, RouteProps, useLocation } from 'react-router-dom'

const PrivateRoute: FC<RouteProps> = ({ children }: RouteProps) => {
  const location = useLocation()

  if (!authStore.isAuthenticated) {
    return <Navigate to={`/login?redirect=${encodeURIComponent(location.pathname)}`} />
  }

  return children as JSX.Element
}

export default observer(PrivateRoute)
