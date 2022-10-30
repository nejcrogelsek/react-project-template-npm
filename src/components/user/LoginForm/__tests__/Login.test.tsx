import userEvent from '@testing-library/user-event'
import LoginForm from 'components/user/LoginForm/LoginForm'
import RegisterForm from 'components/user/RegisterForm/RegisterForm'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import theme from 'styles/shared/theme'
import { cleanRender, render, screen, waitFor } from 'test-utils'

describe('LoginForm', () => {
  test('renders correctly', () => {
    render(<LoginForm />)

    const emailInput = screen.getByRole('textbox', {
      name: 'Email',
    })
    const passwordInput = screen.getByLabelText('Password')
    const showHideIconElement = screen.getByLabelText('show-hide_icon')
    const submitButton = screen.getByRole('button', { name: 'Sign in' })

    const createAccountParagraph = screen.getByText('Do you want to create an account?')
    const redirectToRegisterLink = screen.getByRole('link', { name: 'Sign up' })
    const redirectToForgotPasswordLink = screen.getByRole('link', { name: 'Forgot password' })

    expect(emailInput).toBeInTheDocument()
    expect(passwordInput).toBeInTheDocument()
    expect(showHideIconElement).toBeInTheDocument()
    expect(submitButton).toBeInTheDocument()
    expect(createAccountParagraph).toBeInTheDocument()
    expect(redirectToRegisterLink).toBeInTheDocument()
    expect(redirectToForgotPasswordLink).toBeInTheDocument()
  })

  test('change type on password input', async () => {
    render(<LoginForm />)

    const passwordInput = screen.getByLabelText('Password')
    const showHideIconElement = screen.getByLabelText('show-hide_icon')

    expect(passwordInput).toHaveAttribute('type', 'password')

    await userEvent.click(showHideIconElement)

    expect(passwordInput).toHaveAttribute('type', 'text')
  })

  test('insert email & password, then submit data', async () => {
    const onSubmitMock = jest.fn()
    render(<LoginForm />)

    const formElement = screen.getByRole('form')
    formElement.onsubmit = onSubmitMock

    const emailInput = screen.getByRole('textbox', {
      name: 'Email',
    })
    const passwordInput = screen.getByLabelText('Password')
    const submitButton = screen.getByRole('button', { name: 'Sign in' })

    await userEvent.type(emailInput, 'test@gmail.com')
    await userEvent.type(passwordInput, 'Test123!')

    expect(emailInput).toHaveValue('test@gmail.com')
    expect(passwordInput).toHaveValue('Test123!')

    await userEvent.click(submitButton)

    expect(onSubmitMock).toHaveBeenCalledTimes(1)
  })

  test('redirect to signup page', async () => {
    cleanRender(
      <MemoryRouter initialEntries={['/login']}>
        <ThemeProvider theme={theme}>
          <Routes>
            <Route path="/signup" element={<RegisterForm />} />
            <Route path="/login" element={<LoginForm />} />
          </Routes>
        </ThemeProvider>
      </MemoryRouter>,
    )

    const redirectToRegisterLink = screen.getByRole('link', { name: 'Sign up' })

    expect(redirectToRegisterLink).toBeInTheDocument()
    await userEvent.click(redirectToRegisterLink)
    await waitFor(() => {
      expect(screen.getByRole('button', { name: 'Create Account' })).toBeInTheDocument()
    })
  })
})
