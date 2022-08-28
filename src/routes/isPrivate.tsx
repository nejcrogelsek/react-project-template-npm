import authStore from 'lib/stores/auth.store'
import { FC } from 'react'
import { Navigate, useLocation } from 'react-router-dom'

const isPrivate = (OriginalComponent: FC) => {
  const EnhancedComponent: FC = () => {
    const location = useLocation()
    return authStore.isAuthenticated ? (
      <OriginalComponent />
    ) : (
      <Navigate to={`/login?redirect=${encodeURIComponent(location.pathname)}`} />
    )
  }

  return EnhancedComponent
}

export default isPrivate
