/* eslint-disable react/jsx-props-no-spreading */
import { FC, forwardRef, HTMLInputTypeAttribute, InputHTMLAttributes } from 'react'
import { UseFormRegister } from 'react-hook-form'
import styled from 'styled-components'

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  type: HTMLInputTypeAttribute
  id: string
  register?: UseFormRegister<any>
  ref?: any
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

const InputRef: FC<Props> = forwardRef(({ register, id, ...props }: Props, passedRef: any) => {
  if (register) {
    // How to share ref usage: https://react-hook-form.com/faqs/#Howtosharerefusage
    const { ref, ...rest } = register(id)
    return (
      <InputStyle
        {...rest}
        ref={(e) => {
          ref(e)
          passedRef.current = e
        }}
        id={id}
        {...props}
      />
    )
  }
  return <InputStyle id={id} {...props} ref={passedRef} />
})

InputRef.displayName = 'InputRef'
export default InputRef
