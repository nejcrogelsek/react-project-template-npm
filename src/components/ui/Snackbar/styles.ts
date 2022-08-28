import styled from 'styled-components'

export const SnackbarContainer = styled.div`
  max-width: 344px;
  width: 100%;
  box-sizing: border-box;
  pointer-events: all;
  transition: all 225ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  background-color: red;
  margin-top: 1rem;
  border-top-left-radius: 8px;
  border-bottom-left-radius: 8px;
  color: white;
  padding: 1rem;
  overflow: hidden;
  .progress-line {
    position: absolute;
    bottom: 0;
    left: 0;
    border-bottom-left-radius: 8px;
    height: 5px;
    background-color: rgba(0, 0, 0, 0.3);
    animation: progress-line 5s forwards;
  }
  &:hover > .progress-line {
    display: none;
  }

  @keyframes progress-line {
    0% {
      width: 100%;
    }
    100% {
      width: 0;
    }
  }
`
