/* eslint-disable react/jsx-props-no-spreading */
import { FC, ReactNode, SelectHTMLAttributes } from 'react'
import { UseFormRegister } from 'react-hook-form'
import styled from 'styled-components'

interface Props extends SelectHTMLAttributes<HTMLSelectElement> {
  id: string
  register?: UseFormRegister<any>
  children: ReactNode | ReactNode[]
}

export const SelectStyle = styled.select<Props>`
  height: 38px;
  padding-left: 5px;
  margin-bottom: 0.5rem;
  background: white;
`

const Select: FC<Props> = ({ register, id, children, ...rest }: Props) => {
  if (register) {
    return (
      <SelectStyle {...register(id)} id={id} {...rest}>
        <option></option>
        {children}
      </SelectStyle>
    )
  }
  return (
    <SelectStyle id={id} {...rest}>
      <option></option>
      {children}
    </SelectStyle>
  )
}

export default Select
