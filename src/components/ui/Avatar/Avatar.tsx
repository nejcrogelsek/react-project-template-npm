import { FC, HTMLAttributes } from 'react'
import styled from 'styled-components'

import Icon from '../Icon/Icon'

interface Props extends HTMLAttributes<HTMLDivElement> {
  src: string
}

const AvatarWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 64px;
  height: 64px;
  border-radius: 50%;
  overflow: hidden;
  background-color: #bdbdbd;
  img {
    vertical-align: middle;
    width: 64px;
    height: 64px;
    border-radius: 50%;
    object-fit: cover;
    background-color: white;
  }
  .Icon {
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 48px;
    height: 48px;
    border-radius: 50%;
    fill: white;
  }
`

const Avatar: FC<Props> = ({ src, style }) => {
  return <AvatarWrapper style={{ ...style }}>{src ? <img src={src} alt="User" /> : <Icon icon="user" />}</AvatarWrapper>
}

export default Avatar
