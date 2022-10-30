import LoadingProvider from 'components/providers/LoadingProvider/LoadingProvider'
import ModalProvider from 'components/providers/ModalProvider/ModalProvider'
import SnackbarProvider from 'components/providers/SnackbarProvider/SnackbarProvider'
import Layout from 'components/ui/Layout/Layout'
import Router from 'pages/Router/Router'
import { FC } from 'react'
import useClearErrors from 'utils/useClearErrors'
import useClearSnackbars from 'utils/useClearSnackbars'
import { usePagesIdentification } from 'utils/usePagesIdentification'

const App: FC = () => {
  useClearErrors()
  useClearSnackbars()
  usePagesIdentification()

  return (
    <LoadingProvider>
      <ModalProvider>
        <SnackbarProvider>
          <Layout>
            <Router />
          </Layout>
        </SnackbarProvider>
      </ModalProvider>
    </LoadingProvider>
  )
}

export default App
