import ForgotPasswordForm from 'components/user/ForgotPasswordForm/ForgotPasswordForm'
import { FC } from 'react'
import { AuthPageContainer, H3, P } from 'styles'

const ForgotPassword: FC = () => {
  return (
    <AuthPageContainer>
      <H3>Forgot password?</H3>
      <P>Send us your email and we will send you instructions in your inbox.</P>
      <ForgotPasswordForm />
    </AuthPageContainer>
  )
}

export default ForgotPassword
