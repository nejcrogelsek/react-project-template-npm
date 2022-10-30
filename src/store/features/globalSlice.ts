import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { ErrorAction, LoadingAction } from '../models/Action'
import { Modal } from '../models/Modal'
import { Snackbar } from '../models/Snackbar'

export interface GlobalState {
  modal: Modal | null
  snackbars: Snackbar[]
  globalLoading: boolean
  loadingActions: LoadingAction[]
  errorActions: ErrorAction[]
}

const initialState: GlobalState = {
  modal: null,
  snackbars: [],
  globalLoading: false,
  loadingActions: [],
  errorActions: [],
}

const globalSlice = createSlice({
  name: 'global',
  initialState,
  reducers: {
    setGlobalLoading(state, action: PayloadAction<boolean>) {
      state.globalLoading = action.payload
    },
    addSnackbar(state, action: PayloadAction<Snackbar>) {
      state.snackbars.push(action.payload)
    },
    removeSnackbar(state, action: PayloadAction<string>) {
      state.snackbars = state.snackbars.filter((snackbar) => snackbar.id !== action.payload)
    },
    removeSnackbarWithAction(state, action: PayloadAction<string>) {
      state.snackbars = state.snackbars.filter((snackbar) => snackbar.actionId !== action.payload)
    },
    addModal(state, action: PayloadAction<Modal>) {
      state.modal = action.payload
    },
    removeModal(state) {
      state.modal = null
    },
    startLoading(state, action: PayloadAction<LoadingAction>) {
      state.loadingActions.push(action.payload)
      state.errorActions = state.errorActions.filter((savedAction) => filterAction(savedAction, action))
    },
    stopLoading(state, action: PayloadAction<LoadingAction>) {
      state.loadingActions = state.loadingActions.filter((savedAction) => filterAction(savedAction, action))
    },
    addError(state, action: PayloadAction<ErrorAction>) {
      const errorId = state.errorActions.length
      state.errorActions.push({ ...action.payload, id: errorId.toString() })
    },
    removeError(state, action: PayloadAction<LoadingAction>) {
      state.errorActions = state.errorActions.filter((savedAction) => filterAction(savedAction, action))
    },
  },
})

const filterAction = (currAction: LoadingAction, action: PayloadAction<LoadingAction>) => {
  if (currAction.actionType !== action.payload?.actionType) {
    return true
  } else return currAction.id !== action.payload?.id
}

export const {
  addSnackbar,
  removeSnackbar,
  removeSnackbarWithAction,
  removeModal,
  addModal,
  setGlobalLoading,
  addError,
  removeError,
  stopLoading,
  startLoading,
} = globalSlice.actions
export default globalSlice.reducer
