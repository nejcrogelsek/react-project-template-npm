import LoadingProvider from 'components/providers/LoadingProvider/LoadingProvider'
import ModalProvider from 'components/providers/ModalProvider/ModalProvider'
import SnackbarProvider from 'components/providers/SnackbarProvider/SnackbarProvider'
import { ReactNode } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import theme from 'styles/shared/theme'

const AppProviders = ({ children }: { children: ReactNode }) => {
  return (
    <Router>
      <ThemeProvider theme={theme}>
        <LoadingProvider>
          <ModalProvider>
            <SnackbarProvider>{children}</SnackbarProvider>
          </ModalProvider>
        </LoadingProvider>
      </ThemeProvider>
    </Router>
  )
}

export default AppProviders
