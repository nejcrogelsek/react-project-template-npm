import { useEffect } from 'react'
import { useLocation } from 'react-router'
import { useAppDispatch, useAppSelector } from 'store/app/hooks'
import { removeSnackbar } from 'store/features/globalSlice'

const useClearSnackbars = () => {
  const dispatch = useAppDispatch()
  const snackbars = useAppSelector((state) => state.global.snackbars)
  const { pathname, state } = useLocation()

  const removeSnackbars = () => {
    snackbars.forEach((snackbar) => {
      dispatch(removeSnackbar(snackbar.id))
    })
  }

  useEffect(() => {
    if (!state) {
      removeSnackbars()
    }
  }, [pathname])
}

export default useClearSnackbars
