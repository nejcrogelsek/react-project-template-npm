import { Link } from 'react-router-dom'
import styled from 'styled-components'

export const Logo = styled(Link)`
  background-image: url('images/logo.svg');
  background-repeat: no-repeat;
  background-size: contain;
  display: block;
  width: 141px;
  height: 40px;
  ${(p) => p.theme.screens.l} {
    width: 171px;
  }
`
export const H1 = styled.h1`
  font-size: 96px;
  font-weight: 300;
  margin-bottom: 1rem;
`
export const H2 = styled.h2`
  font-size: 60px;
  font-weight: 300;
  margin-bottom: 1rem;
  > span {
    color: ${(p) => p.theme.colors.green};
  }
`
export const H3 = styled.h3`
  font-size: 48px;
  font-weight: 400;
  margin-bottom: 1rem;
`
export const H4 = styled.h4`
  font-size: 34px;
  font-weight: 400;
  margin-bottom: 1rem;
  > span {
    color: ${(p) => p.theme.colors.green};
  }
`
export const H5 = styled.h5`
  font-size: 24px;
  font-weight: 400;
  margin-bottom: 1rem;
`
export const P = styled.p<{ bold?: boolean }>`
  font-size: 16px;
  line-height: 20px;
  font-weight: ${(p) => (p.bold ? 700 : 400)};
  margin-bottom: 1rem;
`
export const Caption = styled.span`
  font-size: 12px;
  font-weight: 400;
`
