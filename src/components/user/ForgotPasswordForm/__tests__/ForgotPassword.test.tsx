import userEvent from '@testing-library/user-event'
import ForgotPasswordForm from 'components/user/ForgotPasswordForm/ForgotPasswordForm'
import { render, screen } from 'test-utils'

describe('ForgotPassword', () => {
  test('renders correctly', () => {
    render(<ForgotPasswordForm />)

    const emailInput = screen.getByRole('textbox', {
      name: 'Email',
    })
    const submitButton = screen.getByRole('button', { name: 'Submit' })
    const redirectBackToLoginLink = screen.getByRole('link', { name: 'Go back' })

    expect(emailInput).toBeInTheDocument()
    expect(submitButton).toBeInTheDocument()
    expect(redirectBackToLoginLink).toBeInTheDocument()
  })

  test('insert email and submit data', async () => {
    const onSubmitMock = jest.fn()
    render(<ForgotPasswordForm />)

    const formElement = screen.getByRole('form')
    formElement.onsubmit = onSubmitMock

    const emailInput = screen.getByRole('textbox', {
      name: 'Email',
    })
    const submitButton = screen.getByRole('button', { name: 'Submit' })

    await userEvent.type(emailInput, 'test@gmail.com')

    expect(emailInput).toHaveValue('test@gmail.com')

    await userEvent.click(submitButton)

    expect(onSubmitMock).toHaveBeenCalledTimes(1)
  })
})
