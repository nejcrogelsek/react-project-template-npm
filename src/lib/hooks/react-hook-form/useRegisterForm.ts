import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import * as Yup from 'yup'

export interface RegisterFields {
  email: string
  first_name: string
  last_name: string
  password: string
  confirm_password: string
}

export const useRegisterForm = () => {
  const RegisterSchema = Yup.object().shape({
    email: Yup.string().email('Please enter a valid email!').required('Email is required'),
    first_name: Yup.string().required('First name is required'),
    last_name: Yup.string().required('Last name is required'),
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
      email: '',
      first_name: '',
      last_name: '',
      password: '',
      confirm_password: '',
    },
    mode: 'onBlur',
    resolver: yupResolver(RegisterSchema),
  })

  return { handleSubmit, errors, register, reset }
}

export type RegisterForm = ReturnType<typeof useRegisterForm>
