import isEmpty from 'lodash.isempty'
import { ApiError } from 'models/Action'

export const getErrors = <T>(error: string | string[]): ApiError<T> | null => {
  const errors = {} as ApiError<T>

  if (typeof error === 'string') {
    errors.errorMessage = error
    return errors
  }
  error?.forEach((e) => {
    const err = e?.split?.(' ')?.slice?.(1)?.join(' ')
    const curr = e?.split?.(' ')?.[0] as keyof T
    if (!errors[curr]) {
      errors[curr] = ''
    }
    errors[curr] += err?.charAt(0)?.toUpperCase() + err.slice(1) + '\n'
  })
  return isEmpty(errors) ? null : errors
}
