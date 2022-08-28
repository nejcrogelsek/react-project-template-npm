/* eslint-disable react/jsx-props-no-spreading */
import { Modal as ModalProps } from 'models/Modal'
import { FC } from 'react'
import { Col, Row } from 'styles'
import { handleModalCancel } from 'utils/modal'

import Button from '../Button/Button'
import Icon from '../Icon/Icon'
import { ModalStyle } from './styles'

const Modal: FC<ModalProps> = ({ title, children, close, confirmationData, modalStyle }: ModalProps) => {
  const confirm = () => {
    if (confirmationData && confirmationData.onConfirm) {
      confirmationData.onConfirm()
    }
  }

  const cancel = () => {
    if (confirmationData && confirmationData.onCancel) {
      confirmationData.onCancel()
    }
  }

  return (
    <ModalStyle {...modalStyle}>
      {title && (
        <div className="modal-header">
          {title && <h4>{title}</h4>}{' '}
          {close && <Icon className="modal-header-close" icon="close" onClick={handleModalCancel} />}
        </div>
      )}
      <div className="modal-body">
        {children}
        {confirmationData && (
          <>
            {confirmationData.text && <p className="confirmation-text">{confirmationData.text}</p>}
            <Row
              className="actions"
              direction="row"
              justifyContent={modalStyle?.actions?.justifyColDisplay}
              margin={{ top: modalStyle?.actions?.colMargin }}
            >
              <Col size={modalStyle?.actions?.colDisplay ?? 1}>
                <Button size={modalStyle?.actions?.buttonSize} onClick={confirm}>
                  {confirmationData.onConfirmText ?? 'Submit'}
                </Button>
              </Col>
              {confirmationData.onCancel && (
                <Col size={modalStyle?.actions?.colDisplay ?? 1}>
                  <Button size={modalStyle?.actions?.buttonSize} className="link" onClick={cancel}>
                    {confirmationData.onCancelText ?? 'Cancel'}
                  </Button>
                </Col>
              )}
            </Row>
          </>
        )}
      </div>
    </ModalStyle>
  )
}

export default Modal
