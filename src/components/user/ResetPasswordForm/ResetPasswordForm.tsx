import * as API from 'api/Api'
import { Button } from 'components/ui'
import PasswordInput from 'components/ui/PasswordInput/PasswordInput'
import { useResetPasswordForm } from 'lib/hooks/react-hook-form/useResetPasswordForm'
import { useRouter } from 'lib/hooks/useRouter'
import { FC } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useAppSelector } from 'store/app/hooks'
import { Form, FormFeedback, FormGroup } from 'styles'

const ResetPasswordForm: FC = () => {
  const loading = useAppSelector((state) => state.global.globalLoading)
  const { navigate } = useRouter()
  const { errors, handleSubmit, register, reset } = useResetPasswordForm()
  const [searchParams] = useSearchParams()
  const token = searchParams.get('token')?.replaceAll('"', '')

  const onSubmit = handleSubmit(async (data) => {
    console.log(data)
    //   const res = await API.resetPassword(data, token as string)
  })

  return (
    <Form role="form" onSubmit={onSubmit}>
      <FormGroup className="">
        <PasswordInput id="password" register={register} label="Password" />
        {errors.password && <FormFeedback>{errors.password.message}</FormFeedback>}
      </FormGroup>
      <FormGroup>
        <PasswordInput id="confirm_password" register={register} label="Confirm password" />
        {errors.confirm_password && <FormFeedback>{errors.confirm_password.message}</FormFeedback>}
      </FormGroup>
      <FormGroup>
        <Button texttransform="uppercase" size="full" type="submit" disabled={loading ? true : false}>
          Reset password
        </Button>
      </FormGroup>
    </Form>
  )
}

export default ResetPasswordForm
