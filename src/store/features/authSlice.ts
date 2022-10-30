import { createSlice } from '@reduxjs/toolkit'
import userStorage from 'utils/localStorage'

import { loginSuccess, logout } from '../actions/authActions'
import { User } from '../models/Auth'

export interface AuthState {
  user: User | null
}

const defaultUserValues: User | null = null

const initialState: AuthState = {
  user: userStorage.getUser() || defaultUserValues,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginSuccess, (state, action) => {
        userStorage.setUser(action.payload)
        state.user = action.payload
      })
      .addCase(logout, (state) => {
        userStorage.clearUser()
        state.user = null
      })
  },
})

export default authSlice.reducer
