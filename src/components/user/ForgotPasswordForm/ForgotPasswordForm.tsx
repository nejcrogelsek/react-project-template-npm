import * as API from 'api/Api'
import { Button, Input, Link } from 'components/ui'
import { useForgotPasswordForm } from 'lib/hooks/react-hook-form/useForgotPasswordForm'
import globalStore from 'lib/stores/global.store'
import { observer } from 'mobx-react'
import { FC } from 'react'
import { Form, FormFeedback, FormGroup, Label } from 'styles'
import { Snackbar } from 'utils/snackbar'

const ForgotPasswordForm: FC = () => {
  const { errors, handleSubmit, register, reset } = useForgotPasswordForm()

  const onSubmit = handleSubmit(async (data) => {
    globalStore.setGlobalLoading({ payload: true })
    const res = await API.forgotPassword(data)
    globalStore.setGlobalLoading({ payload: false })
    if (res.error) {
      Snackbar.error(res.message)
    } else {
      Snackbar.success(res)
      reset()
    }
  })

  return (
    <Form onSubmit={onSubmit}>
      <FormGroup>
        <Label htmlFor="email">Email</Label>
        <Input type="email" id="email" placeholder="example@gmail.com" register={register} />
        {errors.email && <FormFeedback>{errors.email.message}</FormFeedback>}
      </FormGroup>
      <FormGroup>
        <Button texttransform="uppercase" size="full" type="submit" disabled={globalStore.globalLoading ? true : false}>
          Submit
        </Button>
      </FormGroup>
      <FormGroup>
        <Link className="dark" texttransform="uppercase" size="full" to="/login">
          Go back
        </Link>
      </FormGroup>
    </Form>
  )
}

export default observer(ForgotPasswordForm)
