import globalStore from 'lib/stores/global.store'
import { useEffect } from 'react'
import { useLocation } from 'react-router'

const useClearSnackbars = () => {
  const { snackbars } = globalStore
  const { pathname, state } = useLocation()

  const removeSnackbars = () => {
    snackbars.forEach((snackbar) => {
      globalStore.removeSnackbar({ payload: snackbar.id as string })
    })
  }

  useEffect(() => {
    if (!state) {
      removeSnackbars()
    }
  }, [pathname])
}

export default useClearSnackbars
