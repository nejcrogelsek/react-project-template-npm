import { FC, ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { RingLoader } from 'react-spinners'
import { useAppSelector } from 'store/app/hooks'
import useMountTransition from 'utils/useMountTransition'

import { Backdrop } from './styles'

interface LoadingProviderProps {
  transitionDuration?: number
  loading?: boolean
  children?: ReactNode
}

const LoadingProvider: FC<LoadingProviderProps> = ({ transitionDuration = 300, loading: forceLoading, children }) => {
  const loading = useAppSelector((state) => state.global.globalLoading)

  const shouldRender = useMountTransition(forceLoading || loading, transitionDuration)

  return (
    <>
      {children}
      {(shouldRender || loading) &&
        createPortal(
          <Backdrop>
            <RingLoader color="#ffffff" />
          </Backdrop>,
          document.body,
        )}
    </>
  )
}

export default LoadingProvider
