import authStore from 'lib/stores/auth.store'
import { observer } from 'mobx-react'
import { FC } from 'react'
import { Navigate, RouteProps } from 'react-router-dom'

const RestrictedRoute: FC<RouteProps> = ({ children }: RouteProps) => {
  if (authStore.isAuthenticated) {
    return <Navigate to="/" />
  }
  return children as JSX.Element
}

export default observer(RestrictedRoute)
