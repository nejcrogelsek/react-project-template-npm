import { yupResolver } from '@hookform/resolvers/yup'
import authStore from 'lib/stores/auth.store'
import { useForm } from 'react-hook-form'
import * as Yup from 'yup'

export const useUpdateUserForm = () => {
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
      email: authStore.user?.email ?? '',
      first_name: authStore.user?.first_name ?? '',
      last_name: authStore.user?.last_name ?? '',
    },
    mode: 'onBlur',
    resolver: yupResolver(UpdateUserSchema),
  })

  return { handleSubmit, errors, register, reset }
}

export type UpdateUserForm = ReturnType<typeof useUpdateUserForm>
