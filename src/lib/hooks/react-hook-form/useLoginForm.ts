import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import * as Yup from 'yup'

export interface LoginFields {
  email: string
  password: string
}

export const useLoginForm = () => {
  const LoginSchema = Yup.object().shape({
    email: Yup.string().email('Please enter a valid email').required('Email is required'),
    password: Yup.string()
      .matches(
        /^(?=.*[0-9])(?=.*[!@#"'$=%^&*(),._|<>{}€+?\-\\])(?=.*?[A-Z])(?=.*?[a-z])[a-zA-Z0-9!@#"'$=%^&*(),._|<>{}€+?\-\\]{6,16}$/,
        'Password must have at least 1 upper & lower case letter, 1 number & special character and it must be long more than 5 characters',
      )
      .required('Password is required'),
  })

  const {
    handleSubmit,
    formState: { errors },
    register,
    reset,
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onBlur', // when input is unfocused
    resolver: yupResolver(LoginSchema),
  })

  return { handleSubmit, errors, register, reset }
}

export type LoginReactHookForm = ReturnType<typeof useLoginForm>
