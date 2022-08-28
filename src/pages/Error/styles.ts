import styled from 'styled-components'

export const ErrorPage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 161px);
  ${(p) => p.theme.screens.l} {
    height: calc(100vh - 156px);
  }
  .content {
    > h1 {
      margin-bottom: 1rem;
      > span {
        margin-right: 1rem;
      }
    }
  }
`
