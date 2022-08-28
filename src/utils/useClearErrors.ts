import globalStore from 'lib/stores/global.store'
import { useEffect } from 'react'
import { useLocation } from 'react-router'

const useClearErrors = () => {
  const { errorActions } = globalStore
  const { pathname } = useLocation()

  const removeErrors = () => {
    errorActions.forEach((error) => {
      globalStore.removeError({ payload: error })
    })
  }

  useEffect(() => {
    removeErrors()
  }, [pathname])
}

export default useClearErrors
