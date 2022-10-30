import * as API from 'api/Api'
import { Button, PasswordInput } from 'components/ui'
import { useChangePasswordForm } from 'lib/hooks/react-hook-form/useChangePasswordForm'
import { FC } from 'react'
import { useAppDispatch } from 'store/app/hooks'
import { removeModal } from 'store/features/globalSlice'
import { Col, Form, FormFeedback, FormGroup, Row } from 'styles'

const ChangePasswordForm: FC = () => {
  const dispatch = useAppDispatch()
  const { errors, handleSubmit, register, reset } = useChangePasswordForm()

  const onSubmit = handleSubmit(async (data) => {
    console.log(data)
    //const res = await API.updateUser(data, authStore.user?.id as string)
  })

  return (
    <Form role="form" onSubmit={onSubmit}>
      <FormGroup>
        <PasswordInput id="password" register={register} label="Password" />
        {errors.password && <FormFeedback>{errors.password.message}</FormFeedback>}
      </FormGroup>
      <FormGroup>
        <PasswordInput id="new_password" register={register} label="New password" />
        {errors.new_password && <FormFeedback>{errors.new_password.message}</FormFeedback>}
      </FormGroup>
      <FormGroup>
        <PasswordInput id="confirm_password" register={register} label="Confirm password" />
        {errors.confirm_password && <FormFeedback>{errors.confirm_password.message}</FormFeedback>}
      </FormGroup>
      <Row direction="row" style={{ marginTop: '1rem' }}>
        <Col size={0} margin={{ right: '1rem' }}>
          <Button texttransform="uppercase" type="submit">
            Submit
          </Button>
        </Col>
        <Button className="link" type="button" onClick={() => dispatch(removeModal())}>
          Cancel
        </Button>
      </Row>
    </Form>
  )
}

export default ChangePasswordForm
