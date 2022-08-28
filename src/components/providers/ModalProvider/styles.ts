import styled from 'styled-components'

export const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  width: 100vw;
  background: #00000088;
  z-index: 40;
  display: flex;
  align-items: center;
  justify-content: center;
`
export const BackdropAnimateIn = styled.div`
  visibility: visible;
  opacity: 1;
`
export const ModalContent = styled.div`
  margin: 1.5rem;
  box-sizing: border-box;
  /* height minus margin */
  max-height: calc(100% - 3rem);
  overflow: auto;
`
