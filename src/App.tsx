import Footer from 'components/partials/Footer/Footer'
//Partials
import Navbar from 'components/partials/Navbar/Navbar'
import LoadingProvider from 'components/providers/LoadingProvider/LoadingProvider'
import ModalProvider from 'components/providers/ModalProvider/ModalProvider'
import SnackbarProvider from 'components/providers/SnackbarProvider/SnackbarProvider'
import { observer } from 'mobx-react'
import { FC } from 'react'
import useAuth from 'utils/auth'
import useClearErrors from 'utils/useClearErrors'
import useClearSnackbars from 'utils/useClearSnackbars'
import { usePagesIdentification } from 'utils/usePagesIdentification'

import Routes from './routes/Routes'

const App: FC = () => {
  useClearErrors()
  useClearSnackbars()
  usePagesIdentification()
  //useAuth()

  return (
    <LoadingProvider>
      <ModalProvider>
        <SnackbarProvider>
          <Navbar />
          <Routes />
          <Footer />
        </SnackbarProvider>
      </ModalProvider>
    </LoadingProvider>
  )
}

export default observer(App)
