import { HTMLAttributes } from 'react'

export enum ModalType {
  CONFIRMATION = 'confirmation',
  SUCCESS = 'success',
  PROFILE = 'profile',
  CHANGE_PASSWORD = 'change_password',
  CHANGE_AVATAR = 'change_avatar',
}

export interface Modal extends HTMLAttributes<HTMLDivElement> {
  type: ModalType
  loadingAction?: string
  disableBackdropClose?: boolean
  close?: boolean
  confirmationData?: {
    text?: string
    onConfirm: () => void
    onConfirmText: string
    onCancel?: () => void
    onCancelText?: string
  }
  modalStyle?: ModalStyleProps
}

export interface ModalStyleProps {
  size?: 'big' | 'medium' | 'small'
  titleStyle?: {
    fontSize?: {
      desktop?: number
      mobile?: number
    }
    textAlign?: string
  }
  actions?: {
    colDisplay?: string
    colMargin?: string
    justifyColDisplay?: 'center' | 'space-between' | 'flex-start' | 'flex-end'
    buttonSize?: string
  }
}
