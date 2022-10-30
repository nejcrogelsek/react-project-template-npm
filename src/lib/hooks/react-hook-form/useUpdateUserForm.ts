import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { useAppSelector } from 'store/app/hooks'
import * as Yup from 'yup'

export const useUpdateUserForm = () => {
  const user = useAppSelector((state) => state.auth.user)
  const UpdateUserSchema = Yup.object().shape({
    email: Yup.string().email('Please enter a valid email!').required('Email is required'),
    first_name: Yup.string().required('First name is required'),
    last_name: Yup.string().required('Last name is required'),
  })

  const {
    handleSubmit,
    formState: { errors },
    register,
    reset,
  } = useForm({
    defaultValues: {
      email: user?.email ?? '',
      first_name: user?.first_name ?? '',
      last_name: user?.last_name ?? '',
    },
    mode: 'onSubmit',
    resolver: yupResolver(UpdateUserSchema),
  })

  return { handleSubmit, errors, register, reset }
}

export type UpdateUserForm = ReturnType<typeof useUpdateUserForm>
