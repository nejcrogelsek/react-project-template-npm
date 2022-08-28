import authStore from 'lib/stores/auth.store'
import { FC } from 'react'
import { Navigate } from 'react-router-dom'

const isRestricted = (OriginalComponent: FC) => {
  const EnhancedComponent: FC = () => {
    return authStore.isAuthenticated ? <Navigate to="/" /> : <OriginalComponent />
  }

  return EnhancedComponent
}

export default isRestricted
