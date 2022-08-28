import LoginForm from 'components/user/LoginForm/LoginForm'
import { FC } from 'react'
import { AuthPageContainer, H3, P } from 'styles'

const Login: FC = () => {
  return (
    <AuthPageContainer>
      <H3>Sign in</H3>
      <P>Welcome back to Template. We are glad that you are back.</P>
      <LoginForm />
    </AuthPageContainer>
  )
}

export default Login
