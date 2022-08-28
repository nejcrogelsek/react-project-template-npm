import { AnchorHTMLAttributes, FC } from 'react'
import { Link as RLink, LinkProps } from 'react-router-dom'
import styled from 'styled-components'

type LinkType = AnchorHTMLAttributes<HTMLAnchorElement> & LinkProps

interface Props extends LinkType {
  size?: string
  texttransform?: 'capitalize' | 'lowercase' | 'uppercase' | 'none' | 'inherit' | 'initial' | 'unset'
}

export const LinkStyle = styled(RLink)<Props>`
  display: block;
  color: white;
  width: ${(p) => (p.size ? '100%' : 'max-content')};
  text-transform: ${(p) => (p.texttransform ? p.texttransform : 'none')};
  background-color: ${(p) => p.theme.colors.green};
  border: 1px solid ${(p) => p.theme.colors.green};
  border-radius: 4px;
  padding: 10px 32px;
  font-size: 0.875rem;
  cursor: pointer;
  text-align: center;
  text-decoration: none;
  transition: 0.25s;
  max-width: ${(p) => (p.size && p.size === 'large' ? '345px' : p.size === 'full' ? '100%' : 'max-content')};
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

const Link: FC<Props> = ({ children, onClick, to, ...rest }: Props) => {
  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <LinkStyle to={to} onClick={onClick} {...rest}>
      {children}
    </LinkStyle>
  )
}

export default Link
