export interface LoadingAction {
  id?: string
  actionType: string | undefined
}

export type ApiError<T> = {
  [key in keyof (T & { errorMessage: string })]: string
}

export interface ErrorAction extends LoadingAction {
  error: string | string[]
}
