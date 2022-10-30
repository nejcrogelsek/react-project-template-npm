import * as API from 'api/Api'
import { Button, Input, Link } from 'components/ui'
import PasswordInput from 'components/ui/PasswordInput/PasswordInput'
import { useLoginForm } from 'lib/hooks/react-hook-form/useLoginForm'
import { useRouter } from 'lib/hooks/useRouter'
import { FC, useEffect, useRef } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from 'store/app/hooks'
import { addSnackbar, setGlobalLoading } from 'store/features/globalSlice'
import { SnackbarType } from 'store/models/Snackbar'
import { Form, FormFeedback, FormGroup, Label, P } from 'styles'

const LoginForm: FC = () => {
  const loading = useAppSelector((state) => state.global.globalLoading)
  const snackbars = useAppSelector((state) => state.global.snackbars)
  const dispatch = useAppDispatch()
  const { navigate } = useRouter()
  const { errors, handleSubmit, register, reset } = useLoginForm()
  const [searchParams] = useSearchParams()
  const message = useRef<string>()
  message.current = searchParams.get('message')?.replaceAll('"', '')

  const onSubmit = handleSubmit(async (data) => {
    dispatch(setGlobalLoading(true))
    console.log(data)
  })

  useEffect(() => {
    if (message.current) {
      dispatch(
        addSnackbar({
          id: `success-${snackbars.length}`,
          type: SnackbarType.SUCCESS,
          title: message.current as string,
        }),
      )
    }
  }, [])

  return (
    <Form role="form" onSubmit={onSubmit}>
      <FormGroup>
        <Label htmlFor="email">Email</Label>
        <Input type="email" id="email" placeholder="example@gmail.com" register={register} />
        {errors.email && <FormFeedback>{errors.email.message}</FormFeedback>}
      </FormGroup>
      <FormGroup>
        <PasswordInput id="password" register={register} label="Password" />
        {errors.password && <FormFeedback>{errors.password.message}</FormFeedback>}
      </FormGroup>
      <FormGroup>
        <Button texttransform="uppercase" size="full" type="submit" disabled={loading ? true : false}>
          Sign in
        </Button>
      </FormGroup>
      <FormGroup className="goto">
        <div>
          <P>Do you want to create an account?</P>
          <Link className="link" to="/signup">
            Sign up
          </Link>
        </div>
        <div>
          <Link className="link" to="/forgot-password">
            Forgot password
          </Link>
        </div>
      </FormGroup>
    </Form>
  )
}

export default LoginForm
