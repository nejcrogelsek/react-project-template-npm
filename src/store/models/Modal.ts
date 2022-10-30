import { ReactNode } from 'react'

export enum ModalType {
  SUCCESS = 'success',
}

export interface Modal {
  id?: string
  title: string
  subtitle?: string
  body?: string
  data?: unknown
  type: ModalType
  loadingAction?: string
  disableBackdropClose?: boolean
  primaryButtonText?: string
  secondaryButtonText?: string
  primaryAction?: () => void
  secondaryAction?: () => void
  close?: boolean
  children?: ReactNode
}
