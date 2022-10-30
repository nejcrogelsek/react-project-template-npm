import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from 'store/app/hooks'
import { removeError } from 'store/features/globalSlice'
import { ApiError, LoadingAction } from 'store/models/Action'

import { getErrors } from './errorUtils'

export const useLoadingSelector = (action: LoadingAction): boolean => {
  const dispatch = useAppDispatch()

  const loading = useAppSelector((state) =>
    state.global.loadingActions.some(
      (ac) => ac.actionType === action?.actionType && (action?.id ? ac.id === action.id : true),
    ),
  )

  useEffect(() => {
    return () => {
      dispatch(removeError({ actionType: action?.actionType, id: action?.id }))
    }
    // eslint-disable-next-line
  }, [])

  return loading
}

export const useErrorSelector = <T>(action: LoadingAction): ApiError<T> => {
  const dispatch = useAppDispatch()

  const errorAction = useAppSelector((state) =>
    state.global.errorActions
      ?.slice()
      ?.reverse()
      ?.find((ac) => ac.actionType === action?.actionType && (action?.id ? ac.id === action.id : true)),
  )

  useEffect(() => {
    return () => {
      dispatch(removeError({ actionType: action?.actionType, id: action?.id }))
    }
    // eslint-disable-next-line
  }, [])

  return getErrors<T>(errorAction?.error as string) as ApiError<T>
}
