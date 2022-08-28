import globalStore from 'lib/stores/global.store'
import { ModalType } from 'models/Modal'

const handleModalConfirm = () => {
  openSuccessModal()
}

export const handleModalCancel = () => {
  globalStore.removeModal()
}

export const openSuccessModal = () => {
  globalStore.removeModal()
  globalStore.addModal({
    payload: {
      type: ModalType.SUCCESS,
      disableBackdropClose: false,
      title: 'Your location was deleted',
      confirmationData: {
        onConfirm: handleModalCancel,
        onConfirmText: 'Close',
      },
      modalStyle: {
        size: 'small',
        titleStyle: {
          fontSize: {
            desktop: 24,
            mobile: 24,
          },
        },
        actions: {
          colDisplay: 'contents',
          colMargin: '1rem',
          justifyColDisplay: 'center',
        },
      },
    },
  })
}

export const openConfirmationModal = (handleConfirm?: () => void, handleCancel?: () => void) => {
  globalStore.removeModal()
  globalStore.addModal({
    payload: {
      type: ModalType.CONFIRMATION,
      disableBackdropClose: false,
      title: 'Are you sure?',
      confirmationData: {
        text: 'This location will be deleted. There is no undo of this action.',
        onCancel: handleConfirm ?? handleModalCancel,
        onCancelText: 'Cancel',
        onConfirm: handleCancel ?? handleModalConfirm,
        onConfirmText: 'Submit',
      },
      modalStyle: {
        titleStyle: {
          fontSize: {
            desktop: 24,
            mobile: 24,
          },
        },
        actions: {
          colDisplay: 'contents',
          justifyColDisplay: 'space-between',
        },
      },
    },
  })
}

export const openProfileModal = () => {
  globalStore.removeModal()
  globalStore.addModal({
    payload: {
      type: ModalType.PROFILE,
      disableBackdropClose: false,
      modalStyle: {
        size: 'big',
        titleStyle: {
          fontSize: {
            desktop: 24,
            mobile: 24,
          },
        },
        actions: {
          colDisplay: 'contents',
          justifyColDisplay: 'center',
        },
      },
    },
  })
}

export const openChangePasswordModal = () => {
  globalStore.removeModal()
  globalStore.addModal({
    payload: {
      type: ModalType.CHANGE_PASSWORD,
      disableBackdropClose: false,
      modalStyle: {
        size: 'big',
        titleStyle: {
          fontSize: {
            desktop: 24,
            mobile: 24,
          },
        },
        actions: {
          colDisplay: 'contents',
          justifyColDisplay: 'center',
        },
      },
    },
  })
}

export const openChangeAvatarModal = () => {
  globalStore.removeModal()
  globalStore.addModal({
    payload: {
      type: ModalType.CHANGE_AVATAR,
      disableBackdropClose: false,
      modalStyle: {
        size: 'big',
        titleStyle: {
          fontSize: {
            desktop: 24,
            mobile: 24,
          },
        },
        actions: {
          colDisplay: 'contents',
          justifyColDisplay: 'center',
        },
      },
    },
  })
}

export const openUpdateSuccessModal = () => {
  globalStore.removeModal()
  globalStore.addModal({
    payload: {
      type: ModalType.SUCCESS,
      disableBackdropClose: false,
      title: 'Information changed.',
      confirmationData: {
        text: 'Your settings are saved.',
        onConfirm: handleModalCancel,
        onConfirmText: 'Close',
      },
      modalStyle: {
        size: 'small',
        titleStyle: {
          fontSize: {
            desktop: 24,
            mobile: 24,
          },
        },
        actions: {
          colDisplay: 'contents',
          justifyColDisplay: 'center',
          buttonSize: 'full',
        },
      },
    },
  })
}
