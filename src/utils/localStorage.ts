import { User } from 'store/models/Auth'

const user_prefix = 'token'

const userStorage = {
  getUser: (): User => {
    return JSON.parse(window.localStorage.getItem(`${user_prefix}`) as string) as User
  },
  setUser: (user: User): void => {
    window.localStorage.setItem(`${user_prefix}`, JSON.stringify(user))
  },
  clearUser: (): void => {
    window.localStorage.removeItem(`${user_prefix}`)
  },
}

export default userStorage
