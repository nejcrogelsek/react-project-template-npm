import userEvent from '@testing-library/user-event'
import LoginForm from 'components/user/LoginForm/LoginForm'
import RegisterForm from 'components/user/RegisterForm/RegisterForm'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import theme from 'styles/shared/theme'
import { cleanRender, render, screen, waitFor } from 'test-utils'

describe('RegisterForm', () => {
  test('renders correctly', () => {
    render(<RegisterForm />)

    const fileInput = screen.getByLabelText(/upload avatar/i)
    const emailInput = screen.getByRole('textbox', {
      name: 'Email',
    })
    const firstNameInput = screen.getByRole('textbox', {
      name: /first name/i,
    })
    const lastNameInput = screen.getByRole('textbox', {
      name: /last name/i,
    })
    const passwordInput = screen.getByLabelText('Password')
    const confirmPasswordInput = screen.getByLabelText('Confirm password')
    const showHideIconElement = screen.getAllByLabelText('show-hide_icon')
    const submitButton = screen.getByRole('button', { name: 'Create Account' })
    const createAccountParagraph = screen.getByText('Already have an account?')
    const redirectToRegisterLink = screen.getByRole('link', { name: 'Sign in' })

    expect(fileInput).toBeInTheDocument()
    expect(emailInput).toBeInTheDocument()
    expect(firstNameInput).toBeInTheDocument()
    expect(lastNameInput).toBeInTheDocument()
    expect(passwordInput).toBeInTheDocument()
    expect(confirmPasswordInput).toBeInTheDocument()
    expect(showHideIconElement).toHaveLength(2)
    expect(submitButton).toBeInTheDocument()
    expect(createAccountParagraph).toBeInTheDocument()
    expect(redirectToRegisterLink).toBeInTheDocument()
  })

  test('change type on password inputs', async () => {
    render(<RegisterForm />)

    const passwordInput = screen.getByLabelText('Password')
    const confirmPasswordInput = screen.getByLabelText('Confirm password')
    const showHideIconElement = screen.getAllByLabelText('show-hide_icon')

    // Test password input
    expect(passwordInput).toHaveAttribute('type', 'password')
    await userEvent.click(showHideIconElement[0])
    expect(passwordInput).toHaveAttribute('type', 'text')
    await userEvent.click(showHideIconElement[0])
    expect(passwordInput).toHaveAttribute('type', 'password')

    // Test confirm password
    expect(confirmPasswordInput).toHaveAttribute('type', 'password')
    await userEvent.click(showHideIconElement[1])
    expect(confirmPasswordInput).toHaveAttribute('type', 'text')
    await userEvent.click(showHideIconElement[1])
    expect(confirmPasswordInput).toHaveAttribute('type', 'password')
  })

  test('insert data and then submit form', async () => {
    const onSubmitMock = jest.fn()
    const file = new File(['test'], 'test.png', { type: 'image/png' })
    render(<RegisterForm />)

    // set onSubmitMock function as default form onsubmit function
    const formElement = screen.getByRole('form')
    formElement.onsubmit = onSubmitMock

    const fileInput = screen.getByLabelText(/upload avatar/i) as HTMLInputElement
    const emailInput = screen.getByRole('textbox', {
      name: 'Email',
    })
    const firstNameInput = screen.getByRole('textbox', {
      name: /first name/i,
    })
    const lastNameInput = screen.getByRole('textbox', {
      name: /last name/i,
    })
    const passwordInput = screen.getByLabelText('Password')
    const confirmPasswordInput = screen.getByLabelText('Confirm password')
    const submitButton = screen.getByRole('button', { name: 'Create Account' })

    // upload file
    await userEvent.upload(fileInput, file)
    expect(fileInput.files?.item(0)).toBe(file)
    expect(fileInput.files).toHaveLength(1)

    // type and expect
    await userEvent.type(emailInput, 'test@gmail.com')
    await userEvent.type(firstNameInput, 'test')
    await userEvent.type(lastNameInput, 'testtest')
    await userEvent.type(passwordInput, 'Test123!')
    await userEvent.type(confirmPasswordInput, 'Test123!')
    expect(emailInput).toHaveValue('test@gmail.com')
    expect(firstNameInput).toHaveValue('test')
    expect(lastNameInput).toHaveValue('testtest')
    expect(passwordInput).toHaveValue('Test123!')
    expect(confirmPasswordInput).toHaveValue('Test123!')

    // submit form
    await userEvent.click(submitButton)
    expect(onSubmitMock).toHaveBeenCalledTimes(1)
  })

  test('redirect to login page', async () => {
    cleanRender(
      <MemoryRouter initialEntries={['/signup']}>
        <ThemeProvider theme={theme}>
          <Routes>
            <Route path="/signup" element={<RegisterForm />} />
            <Route path="/login" element={<LoginForm />} />
          </Routes>
        </ThemeProvider>
      </MemoryRouter>,
    )

    const redirectToLoginLink = screen.getByRole('link', { name: 'Sign in' })
    expect(redirectToLoginLink).toBeInTheDocument()

    await userEvent.click(redirectToLoginLink)
    await waitFor(() => {
      expect(screen.getByRole('link', { name: 'Sign up' })).toBeInTheDocument()
    })
  })
})
