import globalStore from 'lib/stores/global.store'
import { SnackbarColor, SnackbarType } from 'models/Snackbar'

export class Snackbar {
  static success(title: string) {
    globalStore.addSnackbar({
      payload: {
        id: globalStore.snackbars.length.toString(),
        type: SnackbarType.SUCCESS,
        theme: SnackbarColor.SUCCESS,
        title: title,
      },
    })
  }

  static warning(title: string) {
    globalStore.addSnackbar({
      payload: {
        id: globalStore.snackbars.length.toString(),
        type: SnackbarType.WARNING,
        theme: SnackbarColor.WARNING,
        title: title,
      },
    })
  }

  static error(title: string) {
    globalStore.addSnackbar({
      payload: {
        id: globalStore.snackbars.length.toString(),
        type: SnackbarType.ERROR,
        theme: SnackbarColor.ERROR,
        title: title,
      },
    })
  }

  static info(title: string) {
    globalStore.addSnackbar({
      payload: {
        id: globalStore.snackbars.length.toString(),
        type: SnackbarType.INFO,
        theme: SnackbarColor.INFO,
        title: title,
      },
    })
  }
}
