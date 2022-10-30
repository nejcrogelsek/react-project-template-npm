import { FC } from 'react'
import { useAppDispatch, useAppSelector } from 'store/app/hooks'
import { addModal, addSnackbar, removeModal } from 'store/features/globalSlice'
import { ModalType } from 'store/models/Modal'
import { SnackbarType } from 'store/models/Snackbar'

const Atoms: FC = () => {
  const snackbars = useAppSelector((state) => state.global.snackbars)
  const dispatch = useAppDispatch()

  return (
    <div className="atoms">
      <h1>Modals</h1>
      <div style={{ position: 'relative', zIndex: 1 }}>
        <button
          onClick={() =>
            dispatch(
              addModal({
                type: ModalType.SUCCESS,
                title: 'Title Here',
                body: 'Body Here',
                subtitle: 'Subtitle Here',
                primaryAction: () =>
                  dispatch(
                    addModal({
                      type: ModalType.SUCCESS,
                      title: 'Success',
                      body: 'Body Here',
                      primaryAction: () => dispatch(removeModal()),
                    }),
                  ),
                secondaryAction: () => dispatch(removeModal()),
              }),
            )
          }
        >
          Open modal
        </button>
      </div>
      <h1>Snackbars</h1>
      <div>
        <button
          onClick={() =>
            dispatch(
              addSnackbar({
                id: `success-${snackbars.length}`,
                type: SnackbarType.SUCCESS,
                body: 'This is body or description.',
                title: 'Success!',
              }),
            )
          }
        >
          Success
        </button>
        <button
          onClick={() =>
            dispatch(
              addSnackbar({
                id: `warning-${snackbars.length}`,
                type: SnackbarType.WARNING,
                title: 'Warning!',
                close: true,
              }),
            )
          }
        >
          Watning
        </button>
        <button
          onClick={() =>
            dispatch(
              addSnackbar({
                id: `error-${snackbars.length}`,
                type: SnackbarType.ERROR,
                body: 'Something went wrong..',
                title: 'Ups!',
                close: true,
              }),
            )
          }
        >
          Error
        </button>
        <button
          onClick={() =>
            dispatch(
              addSnackbar({
                id: `info-${snackbars.length}`,
                type: SnackbarType.INFO,
                body: 'This is body or description.',
              }),
            )
          }
        >
          Success
        </button>
      </div>
    </div>
  )
}

export default Atoms
