import { useEffect } from 'react'
import { useLocation } from 'react-router'
import { useAppDispatch, useAppSelector } from 'store/app/hooks'
import { removeError } from 'store/features/globalSlice'

const useClearErrors = () => {
  const dispatch = useAppDispatch()
  const errorActions = useAppSelector((state) => state.global.errorActions)
  const { pathname } = useLocation()

  const removeErrors = () => {
    errorActions.forEach((error) => {
      dispatch(removeError(error))
    })
  }

  useEffect(() => {
    removeErrors()
  }, [pathname])
}

export default useClearErrors
