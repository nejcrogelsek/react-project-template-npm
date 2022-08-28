import { Modal } from 'components/ui'
import { ModalBackdrop } from 'components/ui/Modal/styles'
import useEventListener from 'lib/hooks/useEventListener'
import globalStore from 'lib/stores/global.store'
import { observer } from 'mobx-react'
import { ModalType } from 'models/Modal'
import { FC, ReactNode } from 'react'
import { createPortal } from 'react-dom'
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
        globalStore.removeModal()
      }
    },
    document,
  )

  const modal = globalStore.modal
  const open = !!modal

  const shouldRender = useMountTransition(open, transitionDuration)

  const loading = useLoadingSelector({
    actionType: modal?.loadingAction ?? '',
  })

  const showModalType = () => {
    switch (modal?.type) {
      case ModalType.CONFIRMATION:
        return <Modal {...modal} />
      case ModalType.SUCCESS:
        return (
          <>
            <Modal {...modal} />
          </>
        )
      case ModalType.PROFILE:
        return <Modal {...modal}>Profile</Modal>
      case ModalType.CHANGE_PASSWORD:
        return <Modal {...modal}>Change password</Modal>
      case ModalType.CHANGE_AVATAR:
        return <Modal {...modal}>Change avatar</Modal>
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
              onClick={loading || modal?.disableBackdropClose ? undefined : () => globalStore.removeModal()}
            ></ModalBackdrop>
            {showModalType()}
          </>,
          document.body,
        )}
    </>
  )
}

export default observer(ModalProvider)
