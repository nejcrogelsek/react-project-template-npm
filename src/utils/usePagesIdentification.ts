import { useEffect } from 'react'

import { useRouter } from '../lib/hooks/useRouter'

const onDefault = () => {
  document.title = 'Template'
  document.body.id = ''
}
const onHome = () => {
  document.title = 'Template'
  document.body.id = 'home-page'
}
const onProfile = () => {
  document.title = 'Template - Profile'
  document.body.id = 'profile-page'
}
const onLogin = () => {
  document.title = 'Template - Login'
  document.body.id = 'login-page'
}
const onSignup = () => {
  document.title = 'Template - Signup'
  document.body.id = 'signup-page'
}
const onForgotPassword = () => {
  document.title = 'Template - Forgot password'
  document.body.id = 'forgot-password-page'
}
const onResetPassword = () => {
  document.title = 'Template - Reset password'
  document.body.id = 'reset-password-page'
}
const onError = () => {
  document.title = 'Template - Error'
  document.body.id = 'error-page'
}

const callbacks: any = {
  '/': [onHome],
  '/my-profile': [onProfile],
  '/login': [onLogin],
  '/signup': [onSignup],
  '/forgot-password': [onForgotPassword],
  '/reset-password': [onResetPassword],
  '/error': [onError],
}

export const addPageIdentification = (_case: string, fn: () => void) => {
  callbacks[_case] = callbacks[_case] || []
  callbacks[_case].push(fn)
}

export const usePagesIdentification = () => {
  const { location } = useRouter()

  const customSwitch = (value: string) => {
    if (callbacks[value]) {
      callbacks[value].forEach((fn: () => void) => {
        fn()
      })
    } else {
      onDefault()
    }
  }

  useEffect(() => {
    if (location.pathname) customSwitch(location.pathname)
  }, [location.pathname])
}
