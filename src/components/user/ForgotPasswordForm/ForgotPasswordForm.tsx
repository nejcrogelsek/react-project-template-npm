import * as API from 'api/Api'
import { Button, Input, Link } from 'components/ui'
import { useForgotPasswordForm } from 'lib/hooks/react-hook-form/useForgotPasswordForm'
import { FC } from 'react'
import { useAppSelector } from 'store/app/hooks'
import { Form, FormFeedback, FormGroup, Label } from 'styles'

const ForgotPasswordForm: FC = () => {
  const loading = useAppSelector((state) => state.global.globalLoading)
  const { errors, handleSubmit, register, reset } = useForgotPasswordForm()

  const onSubmit = handleSubmit(async (data) => {
    console.log(data)
    //await API.forgotPassword(data)
  })

  return (
    <Form role="form" onSubmit={onSubmit}>
      <FormGroup>
        <Label htmlFor="email">Email</Label>
        <Input type="email" id="email" placeholder="example@gmail.com" register={register} />
        {errors.email && <FormFeedback>{errors.email.message}</FormFeedback>}
      </FormGroup>
      <FormGroup>
        <Button texttransform="uppercase" size="full" type="submit" disabled={loading ? true : false}>
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

export default ForgotPasswordForm
