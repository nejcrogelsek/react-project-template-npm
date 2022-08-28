import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import * as Yup from 'yup'

export interface ResetPasswordFields {
  password: string
  confirm_password: string
}

export const useResetPasswordForm = () => {
  const ResetPasswordSchema = Yup.object().shape({
    password: Yup.string()
      .matches(
        /^(?=.*[0-9])(?=.*[!@#"'$=%^&*(),._|<>{}€+?\-\\])(?=.*?[A-Z])(?=.*?[a-z])[a-zA-Z0-9!@#"'$=%^&*(),._|<>{}€+?\-\\]{6,16}$/,
        'Password must have at least 1 upper & lower case letter, 1 number & special character and it must be long more than 5 characters',
      )
      .required('Password is required'),
    confirm_password: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('You need to confirm your password'),
  })

  const {
    handleSubmit,
    formState: { errors },
    register,
    reset,
  } = useForm({
    defaultValues: {
      password: '',
      confirm_password: '',
    },
    mode: 'onBlur', // when input is unfocused
    resolver: yupResolver(ResetPasswordSchema),
  })

  return { handleSubmit, errors, register, reset }
}

export type ResetPasswordReactHookForm = ReturnType<typeof useResetPasswordForm>
