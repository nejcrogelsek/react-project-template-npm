/* eslint-disable react/jsx-props-no-spreading */
import { FC, InputHTMLAttributes, ReactNode } from 'react'
import { UseFormRegister } from 'react-hook-form'
import styled from 'styled-components'
import { Label } from 'styles'

import Icon from '../Icon/Icon'
import Input from '../Input/Input'

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  id: string
  register?: UseFormRegister<any>
  label?: string
  link?: ReactNode
}

const CheckboxContainer = styled.div`
  margin-top: 1rem;
  > input[type='checkbox'] {
    display: none;
  }
  > input + label {
    padding-left: 40px;
    &::before {
      content: '';
      width: 25px;
      height: 25px;
      border-radius: 10px;
      background: #4c4c4c;
      position: absolute;
      left: 2px;
      top: 4px;
    }
    .Icon {
      width: 25px;
      height: 25px;
      background: white;
      position: absolute;
      left: 2.5px;
      top: 4px;
      opacity: 0;
      transition: all 0.25s ease-in-out;
      font-weight: 900;
      text-align: center;
      line-height: 17px;
      color: white;
      font-size: 0.8rem;
    }
  }

  > input[type='checkbox']:checked + label > .Icon {
    opacity: 1 !important;
    background: transparent !important;
    transition: all 0.25s ease-in-out;
  }

  label p > a {
    margin-left: 3px;
  }
`

const CheckBox: FC<Props> = ({ register, id, label, link, ...rest }: Props) => {
  if (register) {
    return (
      <CheckboxContainer>
        <Input type="checkbox" register={register} id={id} {...rest} />
        <Label htmlFor={id}>
          <Icon icon="check" />
          {link ? link : label ?? ''}
        </Label>
      </CheckboxContainer>
    )
  }
  return (
    <CheckboxContainer>
      <Input type="checkbox" id={id} {...rest} />
      <Label htmlFor={id}>
        <Icon icon="check" />
        {link ? link : label ?? ''}
      </Label>
    </CheckboxContainer>
  )
}

export default CheckBox
