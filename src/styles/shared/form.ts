import styled from 'styled-components'

export const Form = styled.form``

export const FormGroup = styled.div<{ image?: boolean }>`
  position: relative;
  margin-bottom: 1rem;

  &.goto {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: space-between;

    > div {
      display: flex;
      justify-content: space-between;
      align-items: center;
      > p {
        margin: 0;
      }
      &:nth-child(2) {
        margin-top: 5px;
        justify-content: flex-end;
      }
    }
  }

  &.avatar {
    margin: 0 auto 2rem;
    width: 64px;
    > input[type='file'] {
      position: absolute;
      left: 0;
      top: 0;
      z-index: 10;
      opacity: 0;
      width: 64px;
      height: 64px;
      &:hover {
        cursor: pointer;
        + label {
          &::before {
            border-color: #000 !important;
          }
        }
      }
    }
    > label {
      .MuiAvatar-root {
        width: 64px;
        height: 64px;
        box-shadow: 0px 0px 8px ${(p) => p.theme.colors.shadow};
      }
    }
    &.button-style {
      margin: 0;
      width: 100%;
      &:hover {
        > label > button {
          background-color: ${(p) => p.theme.colors.green_hover};
          border-color: ${(p) => p.theme.colors.green_hover};
        }
      }
      > input[type='file'] {
        width: 100%;
        height: 39px;
      }
    }
  }

  .Icon {
    position: absolute;
    right: 0.5rem;
    top: 33px;
    width: 25px;
    cursor: pointer;
  }
`

export const Label = styled.label`
  display: block;
  width: 100%;
  font-size: 12px;
  text-align: left;
  font-weight: 600;
  margin-bottom: 8px;
`

export const FormFeedback = styled.div`
  color: red;
  text-align: left;
  font-size: 11px;
  margin: 5px 0 0.5rem;
`
