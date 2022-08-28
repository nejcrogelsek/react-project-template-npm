import * as API from 'api/Api'
import { Button, Input } from 'components/ui'
import { useUpdateUserForm } from 'lib/hooks/react-hook-form/useUpdateUserForm'
import { useRouter } from 'lib/hooks/useRouter'
import authStore from 'lib/stores/auth.store'
import globalStore from 'lib/stores/global.store'
import { observer } from 'mobx-react'
import { FC } from 'react'
import { Col, Form, FormFeedback, FormGroup, Label, Row } from 'styles'
import { handleModalCancel, openChangeAvatarModal, openChangePasswordModal, openUpdateSuccessModal } from 'utils/modal'
import { Snackbar } from 'utils/snackbar'

const UpdateUserForm: FC = () => {
  const { navigate } = useRouter()
  const { errors, handleSubmit, register, reset } = useUpdateUserForm()

  const onSubmit = handleSubmit(async (data) => {
    globalStore.setGlobalLoading({ payload: true })
    const res = await API.updateUser(data, authStore.user?.id as string)
    globalStore.setGlobalLoading({ payload: false })
    if (res.error) {
      Snackbar.error(res.message)
    } else {
      if (typeof res === 'string') {
        globalStore.removeModal()
        await API.signout()
        navigate('/', { state: { onSuccess: 'Check your inbox and verify your account, before logging in again.' } })
        authStore.logout()
      } else {
        authStore.login(res)
        reset()
        openUpdateSuccessModal()
      }
    }
  })

  return (
    <Form onSubmit={onSubmit}>
      <FormGroup>
        <Label htmlFor="email">Email</Label>
        <Input type="email" id="email" register={register} placeholder="" />
        {errors.email && <FormFeedback>{errors.email.message}</FormFeedback>}
      </FormGroup>
      <Row direction="row">
        <Col size={1} margin={{ right: '8px' }}>
          <FormGroup>
            <Label htmlFor="first_name">First name</Label>
            <Input type="text" id="first_name" register={register} placeholder="" />
            {errors.first_name && <FormFeedback>{errors.first_name.message}</FormFeedback>}
          </FormGroup>
        </Col>
        <Col size={1} margin={{ left: '8px' }}>
          <FormGroup>
            <Label htmlFor="last_name">Last name</Label>
            <Input type="text" id="last_name" register={register} placeholder="" />
            {errors.last_name && <FormFeedback>{errors.last_name.message}</FormFeedback>}
          </FormGroup>
        </Col>
      </Row>
      <Row direction="row">
        <Col size={0.5} margin={{ right: '8px' }}>
          <Button className="dark" size="full" type="button" onClick={openChangePasswordModal}>
            Change password
          </Button>
        </Col>
        <Col size={0.5} margin={{ left: '8px' }} onClick={openChangeAvatarModal}>
          <Button size="full" type="button">
            Change profile picture
          </Button>
        </Col>
      </Row>
      <Row direction="row" style={{ marginTop: '1rem' }}>
        <Col size={0} margin={{ right: '1rem' }}>
          <Button texttransform="uppercase" type="submit">
            Submit
          </Button>
        </Col>
        <Button className="link" type="button" onClick={handleModalCancel}>
          Cancel
        </Button>
      </Row>
    </Form>
  )
}

export default observer(UpdateUserForm)
