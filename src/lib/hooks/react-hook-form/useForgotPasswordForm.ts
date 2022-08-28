import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import * as Yup from 'yup'

export interface ForgotPasswordFields {
  email: string
}

export const useForgotPasswordForm = () => {
  const ForgotPasswordSchema = Yup.object().shape({
    email: Yup.string().email('Please enter a valid email').required('Email is required'),
  })

  const {
    handleSubmit,
    formState: { errors },
    register,
    reset,
  } = useForm({
    defaultValues: {
      email: '',
    },
    mode: 'onBlur', // when input is unfocused
    resolver: yupResolver(ForgotPasswordSchema),
  })

  return { handleSubmit, errors, register, reset }
}

export type ForgotPasswordReactHookForm = ReturnType<typeof useForgotPasswordForm>
