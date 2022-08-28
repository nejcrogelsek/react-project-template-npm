import RegisterForm from 'components/user/RegisterForm/RegisterForm'
import { FC } from 'react'
import { AuthPageContainer, H3, P } from 'styles'

const Register: FC = () => {
  return (
    <AuthPageContainer>
      <H3>Sign up</H3>
      <P>Your name will appear on posts and your public profile.</P>
      <RegisterForm />
    </AuthPageContainer>
  )
}

export default Register
