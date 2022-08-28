import { observer } from 'mobx-react'
import { FC } from 'react'
import { openConfirmationModal, openProfileModal, openSuccessModal } from 'utils/modal'
import { Snackbar } from 'utils/snackbar'

const Atoms: FC = () => {
  return (
    <div className="atoms">
      <h1>Modals</h1>
      <div style={{ position: 'relative', zIndex: 1 }}>
        <button onClick={() => openConfirmationModal()}>Open confirmation modal</button>
        <button onClick={openSuccessModal}>Open on success modal</button>
        <button onClick={openProfileModal}>Open profile modal</button>
      </div>
      <h1>Snackbars</h1>
      <div>
        <button onClick={() => Snackbar.success('Check your inbox and verify your account, before logging in.')}>
          Success
        </button>
        <button onClick={() => Snackbar.warning('Warning! Dej poglej malo.')}>Warning</button>
        <button onClick={() => Snackbar.error('Something went wrong.')}>Error</button>
        <button onClick={() => Snackbar.info('This is some information.')}>Info</button>
      </div>
      <div style={{ fontSize: '44px', backgroundColor: 'red', width: '100%', position: 'relative', zIndex: 2 }}>
        OTHER CONTENT
      </div>
    </div>
  )
}

export default observer(Atoms)
