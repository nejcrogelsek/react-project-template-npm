import { Modal } from 'components/ui'
import { ModalBackdrop } from 'components/ui/Modal/styles'
import useEventListener from 'lib/hooks/useEventListener'
import { FC, ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { useAppDispatch, useAppSelector } from 'store/app/hooks'
import { removeModal } from 'store/features/globalSlice'
import { ModalType } from 'store/models/Modal'
import { useLoadingSelector } from 'utils/useLoadingSelector'
import useMountTransition from 'utils/useMountTransition'

interface ModalProviderProps {
  children: ReactNode
  className?: string
  transitionDuration?: number
}

const ModalProvider: FC<ModalProviderProps> = ({ children, transitionDuration = 0 }) => {
  useEventListener(
    'keydown',
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        dispatch(removeModal())
      }
    },
    document,
  )

  const dispatch = useAppDispatch()

  const modal = useAppSelector((state) => state.global.modal)
  const open = !!modal

  const shouldRender = useMountTransition(open, transitionDuration)

  const loading = useLoadingSelector({
    actionType: modal?.loadingAction,
  })

  const showModalType = () => {
    switch (modal?.type) {
      case ModalType.SUCCESS:
        return <Modal {...modal}>Success Modal</Modal>
      default:
        return null
    }
  }

  return (
    <>
      {children}
      {(shouldRender || open) &&
        createPortal(
          <>
            <ModalBackdrop
              onClick={loading || modal?.disableBackdropClose ? undefined : () => dispatch(removeModal())}
            ></ModalBackdrop>
            {showModalType()}
          </>,
          document.body,
        )}
    </>
  )
}

export default ModalProvider
