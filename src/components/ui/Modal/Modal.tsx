/* eslint-disable react/jsx-props-no-spreading */
import { FC } from 'react'
import { useAppDispatch } from 'store/app/hooks'
import { removeModal } from 'store/features/globalSlice'
import { Modal as ModalProps } from 'store/models/Modal'

import Button from '../Button/Button'
import Icon from '../Icon/Icon'
import { ModalStyle } from './styles'

const Modal: FC<ModalProps> = ({ title, primaryAction, secondaryAction, close, children }: ModalProps) => {
  const dispatch = useAppDispatch()
  const confirm = () => {
    if (primaryAction) {
      primaryAction()
    }
  }

  const cancel = () => {
    if (secondaryAction) {
      secondaryAction()
    }
  }

  return (
    <ModalStyle>
      {title && (
        <div className="modal-header">
          {title && <h4>{title}</h4>}{' '}
          {close && <Icon className="modal-header-close" icon="close" onClick={() => dispatch(removeModal())} />}
        </div>
      )}
      <div className="modal-body">{children}</div>
      {primaryAction && <Button onClick={confirm}>Submit</Button>}
      {secondaryAction && <Button onClick={cancel}>Cancel</Button>}
    </ModalStyle>
  )
}

export default Modal
