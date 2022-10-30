import LoadingProvider from 'components/providers/LoadingProvider/LoadingProvider'
import ModalProvider from 'components/providers/ModalProvider/ModalProvider'
import SnackbarProvider from 'components/providers/SnackbarProvider/SnackbarProvider'
import { ReactNode } from 'react'
import { Provider } from 'react-redux'
import { HistoryRouter as Router } from 'redux-first-history/rr6'
import { history, store } from 'store/app/store'
import { ThemeProvider } from 'styled-components'
import theme from 'styles/shared/theme'

const AppProviders = ({ children }: { children: ReactNode }) => {
  return (
    <Provider store={store}>
      <Router history={history}>
        <ThemeProvider theme={theme}>
          <LoadingProvider>
            <ModalProvider>
              <SnackbarProvider>{children}</SnackbarProvider>
            </ModalProvider>
          </LoadingProvider>
        </ThemeProvider>
      </Router>
    </Provider>
  )
}

export default AppProviders
