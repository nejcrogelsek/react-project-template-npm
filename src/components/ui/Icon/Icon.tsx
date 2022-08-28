import cs from 'classnames'
import { CSSProperties, HTMLAttributes } from 'react'

import { IconDefinition, IconSvg } from './Icon.generated'
export * from './Icon.generated'
interface Props extends HTMLAttributes<HTMLDivElement> {
  icon?: IconDefinition
  style?: CSSProperties
  width?: string
  className?: string
  onClick?: () => void
}
const Icon = ({ className, icon, onClick, style, ...rest }: Props) => {
  if (!icon) {
    return null
  }
  return (
    <div style={style} className={cs('Icon', className)} onClick={onClick} {...rest}>
      {IconSvg[icon]}
    </div>
  )
}

export default Icon
