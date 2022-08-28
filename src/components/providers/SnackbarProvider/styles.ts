import styled from 'styled-components'

export const SnackbarProvider = styled.div`
  position: fixed;
  z-index: 50;
  pointer-events: none;
  left: 0;
  top: 0;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  overflow-x: hidden;
`
