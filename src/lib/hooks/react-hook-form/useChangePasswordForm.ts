import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import * as Yup from 'yup'

export const useChangePasswordForm = () => {
  const ChangePasswordSchema = Yup.object().shape({
    password: Yup.string()
      .matches(
        /^(?=.*[0-9])(?=.*[!@#"'$=%^&*(),._|<>{}€+?\-\\])(?=.*?[A-Z])(?=.*?[a-z])[a-zA-Z0-9!@#"'$=%^&*(),._|<>{}€+?\-\\]{6,16}$/,
        'Password must have at least 1 upper & lower case letter, 1 number & special character and it must be long more than 5 characters',
      )
      .required('Current password is required'),
    new_password: Yup.string()
      .matches(
        /^(?=.*[0-9])(?=.*[!@#"'$=%^&*(),._|<>{}€+?\-\\])(?=.*?[A-Z])(?=.*?[a-z])[a-zA-Z0-9!@#"'$=%^&*(),._|<>{}€+?\-\\]{6,16}$/,
        'Password must have at least 1 upper & lower case letter, 1 number & special character and it must be long more than 5 characters',
      )
      .required('Password is required'),
    confirm_password: Yup.string()
      .oneOf([Yup.ref('new_password'), null], 'Passwords must match')
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
      new_password: '',
      confirm_password: '',
    },
    mode: 'onBlur',
    resolver: yupResolver(ChangePasswordSchema),
  })

  return { handleSubmit, errors, register, reset }
}

export type ChangePasswordForm = ReturnType<typeof useChangePasswordForm>
