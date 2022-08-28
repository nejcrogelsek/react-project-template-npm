import { ButtonHTMLAttributes, FC } from 'react'
import styled from 'styled-components'

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  size?: string
  texttransform?: 'capitalize' | 'lowercase' | 'uppercase' | 'none' | 'inherit' | 'initial' | 'unset'
}

export const ButtonStyle = styled.button<Props>`
  display: block;
  color: white;
  width: 100%;
  background-color: ${(p) => p.theme.colors.green};
  text-transform: ${(p) => (p.texttransform ? p.texttransform : 'none')};
  border: 1px solid ${(p) => p.theme.colors.green};
  border-radius: 4px;
  padding: 10px 32px;
  font-size: 0.875rem;
  cursor: pointer;
  transition: 0.25s;
  text-align: center;
  max-width: ${(p) =>
    p.size && p.size === 'large' ? '345px' : p.size === 'full' ? '100%' : p.size ? p.size : '120px'};
  &:hover {
    background-color: ${(p) => p.theme.colors.green_hover};
    border-color: ${(p) => p.theme.colors.green_hover};
  }
  &:disabled {
    background-color: ${(p) => p.theme.colors.green};
    border-color: ${(p) => p.theme.colors.green};
    opacity: 0.75;
    cursor: not-allowed;
    pointer-events: none;
  }
  &.outline {
    background-color: white;
    color: ${(p) => p.theme.colors.green};
    border-color: ${(p) => p.theme.colors.green};
    &:hover {
      background-color: ${(p) => p.theme.colors.green};
      color: white;
    }
    &:disabled {
      color: ${(p) => p.theme.colors.green};
      background-color: white;
      border-color: ${(p) => p.theme.colors.green};
      opacity: 0.75;
      cursor: not-allowed;
      pointer-events: none;
    }
  }
  &.link {
    background-color: transparent;
    padding: 0;
    border: none;
    color: ${(p) => p.theme.colors.dark};
    text-decoration: none;
    width: max-content;

    &:hover {
      color: ${(p) => p.theme.colors.green};
    }

    &:disabled {
      color: ${(p) => p.theme.colors.dark};
      opacity: 0.75;
      cursor: not-allowed;
      pointer-events: none;
    }
  }
  &.dark {
    background-color: ${(p) => p.theme.colors.dark};
    color: ${(p) => p.theme.colors.white};
    border-color: ${(p) => p.theme.colors.dark};
    &:hover {
      background-color: ${(p) => p.theme.colors.dark_hover};
    }
    &:disabled {
      color: ${(p) => p.theme.colors.dark};
      background-color: white;
      border-color: ${(p) => p.theme.colors.dark};
      opacity: 0.75;
      cursor: not-allowed;
      pointer-events: none;
    }
  }
`

const Button: FC<Props> = ({ children, onClick, type, ...rest }: Props) => {
  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <ButtonStyle type={type} onClick={onClick} {...rest}>
      {children}
    </ButtonStyle>
  )
}

export default Button
