import { makeAutoObservable } from 'mobx'
import { ErrorAction, LoadingAction } from 'models/Action'
import { Modal } from 'models/Modal'
import { Snackbar } from 'models/Snackbar'
import { PayloadAction } from 'types/action'

export interface GlobalState {
  modal: Modal
  snackbars: Snackbar[]
  globalLoading: boolean
  loadingActions: LoadingAction[]
  errorActions: ErrorAction[]
}

class GlobalStore {
  modal: Modal | null = null
  snackbars: Snackbar[] = []
  globalLoading = false
  loadingActions: LoadingAction[] = []
  errorActions: ErrorAction[] = []

  constructor() {
    makeAutoObservable(this)
  }

  setGlobalLoading(action: PayloadAction<boolean>) {
    this.globalLoading = action.payload
  }

  addSnackbar(action: PayloadAction<Snackbar>) {
    this.snackbars.push(action.payload)
  }

  removeSnackbar(action: PayloadAction<string>) {
    this.snackbars = this.snackbars.filter((snackbar) => snackbar.id !== action.payload)
  }

  removeSnackbarWithAction(action: PayloadAction<string>) {
    this.snackbars = this.snackbars.filter((snackbar) => snackbar.actionId !== action.payload)
  }

  addModal(action: PayloadAction<Modal>) {
    this.modal = action.payload
  }

  removeModal() {
    this.modal = null
  }

  startLoading(action: PayloadAction<LoadingAction>) {
    this.loadingActions.push(action.payload)
    this.errorActions = this.errorActions.filter((savedAction) => filterAction(savedAction, action))
  }

  stopLoading(action: PayloadAction<LoadingAction>) {
    this.loadingActions = this.loadingActions.filter((savedAction) => filterAction(savedAction, action))
  }

  addError(action: PayloadAction<ErrorAction>) {
    const errorId = this.errorActions.length
    this.errorActions.push({ ...action.payload, id: errorId.toString() })
  }

  removeError(action: PayloadAction<LoadingAction>) {
    this.errorActions = this.errorActions.filter((savedAction) => filterAction(savedAction, action))
  }
}

const filterAction = (currAction: LoadingAction, action: PayloadAction<LoadingAction>) => {
  if (currAction.actionType !== action.payload?.actionType) {
    return true
  } else return currAction.id !== action.payload?.id
}

const globalStore = new GlobalStore()
export default globalStore
