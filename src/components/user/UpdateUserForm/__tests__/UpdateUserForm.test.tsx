import userEvent from '@testing-library/user-event'
import UpdateUserForm from 'components/user/UpdateUserForm/UpdateUserForm'
import { render, screen } from 'test-utils'

describe('UpdateUserForm', () => {
  test('renders correctly', () => {
    render(<UpdateUserForm />)

    const emailInput = screen.getByRole('textbox', {
      name: 'Email',
    })
    const firstNameInput = screen.getByRole('textbox', {
      name: /first name/i,
    })
    const lastNameInput = screen.getByRole('textbox', {
      name: /last name/i,
    })

    const changePasswordButton = screen.getByRole('button', { name: 'Change password' })
    const changeProfilePictureButton = screen.getByRole('button', { name: 'Change profile picture' })
    const submitButton = screen.getByLabelText('Update user')
    const cancelButton = screen.getByLabelText('Cancel update user')

    expect(emailInput).toBeInTheDocument()
    expect(firstNameInput).toBeInTheDocument()
    expect(lastNameInput).toBeInTheDocument()
    expect(changePasswordButton).toBeInTheDocument()
    expect(changeProfilePictureButton).toBeInTheDocument()
    expect(submitButton).toBeInTheDocument()
    expect(cancelButton).toBeInTheDocument()
  })

  test('insert data and then submit form', async () => {
    const onSubmitMock = jest.fn()
    render(<UpdateUserForm />)

    const formElement = screen.getByRole('form')
    formElement.onsubmit = onSubmitMock

    const emailInput = screen.getByRole('textbox', {
      name: 'Email',
    })
    const firstNameInput = screen.getByRole('textbox', {
      name: /first name/i,
    })
    const lastNameInput = screen.getByRole('textbox', {
      name: /last name/i,
    })
    const submitButton = screen.getByLabelText('Update user')

    await userEvent.type(emailInput, 'test@gmail.com')
    await userEvent.type(firstNameInput, 'test')
    await userEvent.type(lastNameInput, 'testtest')
    expect(emailInput).toHaveValue('test@gmail.com')
    expect(firstNameInput).toHaveValue('test')
    expect(lastNameInput).toHaveValue('testtest')

    await userEvent.click(submitButton)
    expect(onSubmitMock).toHaveBeenCalledTimes(1)
  })
})
