import ResetPasswordForm from 'components/user/ResetPasswordForm/ResetPasswordForm'
import useMediaQuery from 'lib/hooks/useMediaQuery'
import { FC } from 'react'
import { AuthPageContainer, H3, P } from 'styles'

const ResetPassword: FC = () => {
  return (
    <AuthPageContainer>
      <H3>Reset your password</H3>
      <P>Fill new password and confirm password fields.</P>
      <ResetPasswordForm />
    </AuthPageContainer>
  )
}

export default ResetPassword
