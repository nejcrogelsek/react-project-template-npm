export interface Snackbar {
  id: string
  actionId?: string
  type: SnackbarType
  theme: SnackbarColor
  title: string
}

export enum SnackbarType {
  SUCCESS = 'SUCCESS',
  WARNING = 'WARNING',
  ERROR = 'ERROR',
  INFO = 'INFO',
}

export enum SnackbarColor {
  SUCCESS = '#619B8A',
  WARNING = '#FCCA46',
  ERROR = '#FF4242',
  INFO = '#233D4D',
}
