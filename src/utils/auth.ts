import * as API from 'api/Api'
import authStore from 'lib/stores/auth.store'
import { useEffect } from 'react'

export const interval = setInterval(() => {
  refreshAuthenticationToken()
}, +process.env.REACT_APP_REFRESH_TIME!)

export const refreshAuthenticationToken = async () => {
  const res = await API.refreshTokens()
  if (res?.statusCode !== 401) {
    authStore.login(res)
  } else {
    await API.signout()
    authStore.logout()
    clearInterval(interval)
  }
}

const useAuth = () => {
  useEffect(() => {
    const auth = async () => {
      const res = await API.fetchUser()
      if (res.statusCode !== 401) {
        authStore.login(res)
        return interval
      } else {
        refreshAuthenticationToken()
      }
    }
    auth()
    return () => {
      auth()
    }
  }, [])
}

export default useAuth
