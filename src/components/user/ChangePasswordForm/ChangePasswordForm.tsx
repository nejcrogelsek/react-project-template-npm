import * as API from 'api/Api'
import { Button, PasswordInput } from 'components/ui'
import { useChangePasswordForm } from 'lib/hooks/react-hook-form/useChangePasswordForm'
import authStore from 'lib/stores/auth.store'
import globalStore from 'lib/stores/global.store'
import { observer } from 'mobx-react'
import { FC } from 'react'
import { Col, Form, FormFeedback, FormGroup, Row } from 'styles'
import { openProfileModal, openUpdateSuccessModal } from 'utils/modal'
import { Snackbar } from 'utils/snackbar'

const ChangePasswordForm: FC = () => {
  const { errors, handleSubmit, register, reset } = useChangePasswordForm()

  const onSubmit = handleSubmit(async (data) => {
    globalStore.setGlobalLoading({ payload: true })
    const res = await API.updateUser(data, authStore.user?.id as string)
    globalStore.setGlobalLoading({ payload: false })
    if (res.error) {
      Snackbar.error(res.message)
    } else {
      reset()
      openUpdateSuccessModal()
    }
  })

  return (
    <Form onSubmit={onSubmit}>
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
        <Button className="link" type="button" onClick={openProfileModal}>
          Cancel
        </Button>
      </Row>
    </Form>
  )
}

export default observer(ChangePasswordForm)
