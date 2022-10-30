import userEvent from '@testing-library/user-event'
import ChangePasswordForm from 'components/user/ChangePasswordForm/ChangePasswordForm'
import { render, screen } from 'test-utils'

describe('ResetPassword', () => {
  test('renders correctly', () => {
    render(<ChangePasswordForm />)

    const passwordInput = screen.getByLabelText('Password')
    const newPasswordInput = screen.getByLabelText('New password')
    const confirmPasswordInput = screen.getByLabelText('Confirm password')
    const submitButton = screen.getByRole('button', { name: 'Submit' })
    const backButton = screen.getByRole('button', { name: 'Cancel' })

    expect(passwordInput).toBeInTheDocument()
    expect(newPasswordInput).toBeInTheDocument()
    expect(confirmPasswordInput).toBeInTheDocument()
    expect(submitButton).toBeInTheDocument()
    expect(backButton).toBeInTheDocument()
  })

  test('change type on password inputs', async () => {
    render(<ChangePasswordForm />)

    const passwordInput = screen.getByLabelText('Password')
    const newPasswordInput = screen.getByLabelText('New password')
    const confirmPasswordInput = screen.getByLabelText('Confirm password')
    const showHideIconElement = screen.getAllByLabelText('show-hide_icon')

    expect(showHideIconElement).toHaveLength(3)

    // Test password input
    expect(passwordInput).toHaveAttribute('type', 'password')
    await userEvent.click(showHideIconElement[0])
    expect(passwordInput).toHaveAttribute('type', 'text')
    await userEvent.click(showHideIconElement[0])
    expect(passwordInput).toHaveAttribute('type', 'password')

    // Test confirm password
    expect(newPasswordInput).toHaveAttribute('type', 'password')
    await userEvent.click(showHideIconElement[1])
    expect(newPasswordInput).toHaveAttribute('type', 'text')
    await userEvent.click(showHideIconElement[1])
    expect(newPasswordInput).toHaveAttribute('type', 'password')

    // Test confirm password
    expect(confirmPasswordInput).toHaveAttribute('type', 'password')
    await userEvent.click(showHideIconElement[2])
    expect(confirmPasswordInput).toHaveAttribute('type', 'text')
    await userEvent.click(showHideIconElement[2])
    expect(confirmPasswordInput).toHaveAttribute('type', 'password')
  })

  test('insert data and submit form', async () => {
    const onSubmitMock = jest.fn()
    render(<ChangePasswordForm />)

    const form = screen.getByRole('form')
    form.onsubmit = onSubmitMock

    const passwordInput = screen.getByLabelText('Password')
    const newPasswordInput = screen.getByLabelText('New password')
    const confirmPasswordInput = screen.getByLabelText('Confirm password')
    const submitButton = screen.getByRole('button', { name: 'Submit' })

    await userEvent.type(passwordInput, 'Test123!')
    await userEvent.type(newPasswordInput, 'New123!')
    await userEvent.type(confirmPasswordInput, 'New123!')
    expect(passwordInput).toHaveValue('Test123!')
    expect(newPasswordInput).toHaveValue('New123!')
    expect(confirmPasswordInput).toHaveValue('New123!')

    await userEvent.click(submitButton)
    expect(onSubmitMock).toHaveBeenCalledTimes(1)
  })
})
