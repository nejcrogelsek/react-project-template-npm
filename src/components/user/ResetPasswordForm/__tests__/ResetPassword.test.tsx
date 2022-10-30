import userEvent from '@testing-library/user-event'
import ResetPasswordForm from 'components/user/ResetPasswordForm/ResetPasswordForm'
import { render, screen } from 'test-utils'

describe('ResetPassword', () => {
  test('renders correctly', () => {
    render(<ResetPasswordForm />)

    const passwordInput = screen.getByLabelText('Password')
    const confirmPasswordInput = screen.getByLabelText('Confirm password')
    const submitButton = screen.getByRole('button', { name: 'Reset password' })

    expect(passwordInput).toBeInTheDocument()
    expect(confirmPasswordInput).toBeInTheDocument()
    expect(submitButton).toBeInTheDocument()
  })

  test('change type on password inputs', async () => {
    render(<ResetPasswordForm />)

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

  test('insert data and submit form', async () => {
    const onSubmitMock = jest.fn()
    render(<ResetPasswordForm />)

    const form = screen.getByRole('form')
    form.onsubmit = onSubmitMock

    const passwordInput = screen.getByLabelText('Password')
    const confirmPasswordInput = screen.getByLabelText('Confirm password')
    const submitButton = screen.getByRole('button', { name: 'Reset password' })

    await userEvent.type(passwordInput, 'Test123!')
    await userEvent.type(confirmPasswordInput, 'Test123!')
    expect(passwordInput).toHaveValue('Test123!')
    expect(confirmPasswordInput).toHaveValue('Test123!')

    await userEvent.click(submitButton)
    expect(onSubmitMock).toHaveBeenCalledTimes(1)
  })
})
