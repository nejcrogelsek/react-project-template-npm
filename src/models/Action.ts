export interface LoadingAction {
  id?: string
  actionType: string
}

export type ApiError<T> = {
  [key in keyof (T & { errorMessage: string })]: string
}

export interface ErrorAction extends LoadingAction {
  error: string | string[]
}
