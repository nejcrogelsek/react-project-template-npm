import styled from 'styled-components'

export interface ModalStyleProps {
  size?: 'big' | 'medium' | 'small'
  titleStyle?: {
    fontSize?: {
      desktop?: number
      mobile?: number
    }
    textAlign?: string
  }
  actions?: {
    colDisplay?: string
    justifyColDisplay?: 'center' | 'space-between' | 'flex-start' | 'flex-end'
  }
}

interface ModalBackdropProps {
  transparent?: boolean
}

export const ModalStyle = styled.div<ModalStyleProps>`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  z-index: 50;
  box-shadow: 0px 0px 6px -1px rgba(0, 0, 0, 0.2);
  width: ${(p) =>
    p.size === 'big' ? 'min(100%, 600px)' : p.size === 'small' ? 'min(100%, 365px)' : 'min(100%, 485px)'};
  max-height: 600px;
  overflow-x: hidden;

  .modal-header {
    position: relative;
    display: flex;
    padding: 2rem 2rem 0;
    margin-bottom: 0;

    > h4 {
      line-height: 38px;
      flex: 1;
      font-size: ${(p) => (p.titleStyle?.fontSize?.desktop ? `${p.titleStyle?.fontSize.desktop}px` : '34px')};
      text-align: ${(p) => (p.titleStyle?.textAlign ? p.titleStyle?.textAlign : 'start')};
      ${(p) => p.theme.screens.xs} {
        font-size: ${(p) =>
          p.titleStyle?.fontSize?.mobile
            ? `${p.titleStyle?.fontSize.mobile}px`
            : `${p.titleStyle?.fontSize?.desktop}px`};
      }
    }
    .modal-header-close {
      position: absolute;
      top: 0.5rem;
      right: 0.5rem;
      width: 38px;
      height: 38px;
      cursor: pointer;
    }
  }

  .modal-body {
    padding: 0.5rem 2rem 2rem;
    .confirmation-text {
      font-size: 1rem;

      & + .actions {
        margin-top: 1rem;
      }
    }

    .actions {
      ${(p) =>
        p.actions?.justifyColDisplay === 'center' &&
        `
        > div {
          flex: inherit;
        }
      `}
    }
  }
`

export const ModalBackdrop = styled.div<ModalBackdropProps>`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  width: 100vw;
  background-color: ${(p) => (p.transparent ? 'transparent' : 'rgba(0, 0, 0, 0.25)')};
  z-index: 40;
`
