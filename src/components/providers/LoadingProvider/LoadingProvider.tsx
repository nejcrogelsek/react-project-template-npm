import globalStore from 'lib/stores/global.store'
import { observer } from 'mobx-react'
import { FC, ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { RingLoader } from 'react-spinners'
import useMountTransition from 'utils/useMountTransition'

import { Backdrop } from './styles'

interface LoadingProviderProps {
  transitionDuration?: number
  loading?: boolean
  children?: ReactNode
}

const LoadingProvider: FC<LoadingProviderProps> = ({ transitionDuration = 300, loading: forceLoading, children }) => {
  const loading = globalStore.globalLoading

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

export default observer(LoadingProvider)
