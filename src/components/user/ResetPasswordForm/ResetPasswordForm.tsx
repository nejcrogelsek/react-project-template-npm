import * as API from 'api/Api'
import { Button } from 'components/ui'
import PasswordInput from 'components/ui/PasswordInput/PasswordInput'
import { useResetPasswordForm } from 'lib/hooks/react-hook-form/useResetPasswordForm'
import { useRouter } from 'lib/hooks/useRouter'
import globalStore from 'lib/stores/global.store'
import { observer } from 'mobx-react'
import { FC } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Form, FormFeedback, FormGroup } from 'styles'
import { Snackbar } from 'utils/snackbar'

const ResetPasswordForm: FC = () => {
  const { navigate } = useRouter()
  const { errors, handleSubmit, register, reset } = useResetPasswordForm()
  const [searchParams] = useSearchParams()
  const token = searchParams.get('token')?.replaceAll('"', '')

  const onSubmit = handleSubmit(async (data) => {
    globalStore.setGlobalLoading({ payload: true })
    const res = await API.resetPassword(data, token as string)
    globalStore.setGlobalLoading({ payload: false })
    if (res.error) {
      Snackbar.error(res.message)
    } else {
      Snackbar.success(res)
      reset()
      navigate('/login')
    }
  })

  return (
    <Form role='form' onSubmit={onSubmit}>
      <FormGroup className="">
        <PasswordInput id="password" register={register} label="Password" />
        {errors.password && <FormFeedback>{errors.password.message}</FormFeedback>}
      </FormGroup>
      <FormGroup>
        <PasswordInput id="confirm_password" register={register} label="Confirm password" />
        {errors.confirm_password && <FormFeedback>{errors.confirm_password.message}</FormFeedback>}
      </FormGroup>
      <FormGroup>
        <Button texttransform="uppercase" size="full" type="submit" disabled={globalStore.globalLoading ? true : false}>
          Reset password
        </Button>
      </FormGroup>
    </Form>
  )
}

export default observer(ResetPasswordForm)
