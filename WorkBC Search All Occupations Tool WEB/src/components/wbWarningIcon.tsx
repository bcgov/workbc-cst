import clsx from 'clsx'
import React, { CSSProperties } from 'react'
import { ExclamationCircleOutlined , WarningOutlined  } from '@ant-design/icons'
// import '../styles/warning-icon.scss'

type IconSize = 'small' | 'medium' | 'large'
type Variant = 'triangle' | 'circle'

interface Props {
  className?: string
  messageType: string
  size: IconSize
  sizePx?: number
  style?: CSSProperties
  variant?: Variant
}

// this component MUST be class as it is complaining due to AntD library
// remember not to ever use AntD library
class WarningIcon extends React.Component<Props> {
  render() {
    const { messageType, size, className, sizePx, style, variant = 'triangle' } = this.props

    const iconClass = clsx(
      'warning-icon__icon',
      { 'warning-icon__icon--warning': messageType === 'warning' },
      { 'warning-icon__icon--error': messageType === 'error' },
      { 'warning-icon__icon--small': size === 'small' },
      { 'warning-icon__icon--medium': size === 'medium' },
      { 'warning-icon__icon--large': size === 'large' },
      { 'warning-icon__icon--triangle': variant === 'triangle' },
    )

    const Component = variant === 'triangle' ? WarningOutlined  : ExclamationCircleOutlined

    const componentClass = clsx('warning-icon', className)
    return (
      <div className={componentClass} style={style}>
        <Component className={iconClass} style={{ fontSize: sizePx }} />
      </div>
    )
  }
}

export default WarningIcon
