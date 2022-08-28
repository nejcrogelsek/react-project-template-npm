/* eslint-disable react/jsx-props-no-spreading */
import { FC, HTMLInputTypeAttribute, InputHTMLAttributes } from 'react'
import { UseFormRegister } from 'react-hook-form'
import styled from 'styled-components'

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  type: HTMLInputTypeAttribute
  id: string
  register?: UseFormRegister<any>
}

export const InputStyle = styled.input<Props>`
  display: block;
  width: 100%;
  font-size: 16px;
  border: 1px solid #000;
  border-radius: 4px;
  padding: 12px 12px;
  outline: none;
  background: white;
`

const Input: FC<Props> = ({ register, id, ...rest }: Props) => {
  if (register) {
    return <InputStyle {...register(id)} id={id} {...rest} />
  }
  return <InputStyle id={id} {...rest} />
}

export default Input
