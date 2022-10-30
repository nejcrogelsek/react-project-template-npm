/* eslint-disable react/jsx-props-no-spreading */
import { FC, InputHTMLAttributes, useRef, useState } from 'react'
import { UseFormRegister } from 'react-hook-form'
import { Label } from 'styles'

import Icon from '../Icon/Icon'
import InputRef from '../InputRef/InputRef'

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  id: string
  register?: UseFormRegister<any>
  label: string
}

const PasswordInput: FC<Props> = ({ register, id, label }: Props) => {
  const [hidePassword, setHidePassword] = useState(false)
  const passwordInput = useRef<any>()

  const handleHidePassword = () => {
    if (hidePassword) {
      passwordInput.current.type = 'password'
    } else {
      passwordInput.current.type = 'text'
    }
    setHidePassword(!hidePassword)
  }

  if (register) {
    return (
      <>
        <Label htmlFor={id}>{label}</Label>
        <InputRef ref={passwordInput} type="password" id={id} register={register} placeholder="" />
        {hidePassword ? (
          <Icon aria-label="show-hide_icon" icon="eye-slash" onClick={handleHidePassword} />
        ) : (
          <Icon aria-label="show-hide_icon" icon="eye" onClick={handleHidePassword} />
        )}
      </>
    )
  }

  return (
    <>
      <Label htmlFor={id}>{label}</Label>
      <InputRef ref={passwordInput} type="password" id={id} placeholder="" />
      {hidePassword ? (
        <Icon aria-label="show-hide_icon" icon="eye-slash" onClick={handleHidePassword} />
      ) : (
        <Icon aria-label="show-hide_icon" icon="eye" onClick={handleHidePassword} />
      )}
    </>
  )
}

export default PasswordInput
