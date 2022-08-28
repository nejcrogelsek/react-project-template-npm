import globalStore from 'lib/stores/global.store'
import { LoadingAction } from 'models/Action'
import { useEffect } from 'react'

export const useLoadingSelector = (action: LoadingAction): boolean => {
  const loading = globalStore.loadingActions.some(
    (ac) => ac.actionType === action?.actionType && (action?.id ? ac.id === action.id : true),
  )

  useEffect(() => {
    return () => {
      globalStore.removeError({ payload: { actionType: action?.actionType, id: action?.id } })
    }
    // eslint-disable-next-line
  }, [])

  return loading
}
