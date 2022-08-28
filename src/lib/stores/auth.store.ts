import * as API from 'api/Api'
import { makeAutoObservable } from 'mobx'

export interface AuthContextType {
  isAuthenticated: boolean
  user?: API.User
  error?: string | { [key: string]: string }
  reloadAuthentication: () => void
  login: () => void
  logout: () => void
}

class AuthStore {
  isAuthenticated = false
  user?: API.User = undefined
  error?: string | { [key: string]: string } = undefined

  constructor() {
    makeAutoObservable(this)
  }

  login(user: API.User) {
    this.user = user
    this.isAuthenticated = true
  }

  logout() {
    this.user = undefined
    this.isAuthenticated = false
  }

  reloadAuthentication() {
    console.log('authStore -> reloadAuthentication')
    if (this.user) {
      this.isAuthenticated = true
    } else {
      this.isAuthenticated = false
    }
  }
}

const authStore = new AuthStore()
export default authStore
