export interface IError extends Error {
  response?: {
    data: {
      error: string
    }
  }
}
