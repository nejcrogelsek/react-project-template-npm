import * as API from 'api/Api'
import { Button, Input, Link } from 'components/ui'
import PasswordInput from 'components/ui/PasswordInput/PasswordInput'
import { useLoginForm } from 'lib/hooks/react-hook-form/useLoginForm'
import { useRouter } from 'lib/hooks/useRouter'
import authStore from 'lib/stores/auth.store'
import globalStore from 'lib/stores/global.store'
import { observer } from 'mobx-react'
import { FC, useEffect, useRef } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Form, FormFeedback, FormGroup, Label, P } from 'styles'
import { Snackbar } from 'utils/snackbar'

const LoginForm: FC = () => {
  const { navigate } = useRouter()
  const { errors, handleSubmit, register, reset } = useLoginForm()
  const [searchParams] = useSearchParams()
  const message = useRef<string>()
  message.current = searchParams.get('message')?.replaceAll('"', '')

  const onSubmit = handleSubmit(async (data) => {
    globalStore.setGlobalLoading({ payload: true })
    const res = await API.login(data)
    globalStore.setGlobalLoading({ payload: false })
    if (res.error) {
      Snackbar.error(res.message)
    } else {
      authStore.login(res)
      reset()
      navigate('/my-profile')
    }
  })

  useEffect(() => {
    if (message.current) {
      Snackbar.success(message.current as string)
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
        <Button texttransform="uppercase" size="full" type="submit" disabled={globalStore.globalLoading ? true : false}>
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

export default observer(LoginForm)
