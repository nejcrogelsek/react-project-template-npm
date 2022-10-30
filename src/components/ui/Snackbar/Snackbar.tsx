import { FC, useEffect, useRef, useState } from 'react'
import { useAppDispatch } from 'store/app/hooks'
import { removeSnackbar } from 'store/features/globalSlice'
import { Snackbar as ISnackbar, SnackbarColor, SnackbarType } from 'store/models/Snackbar'
import useMountTransition from 'utils/useMountTransition'

import Icon from '../Icon/Icon'
import { SnackbarContainer } from './styles'

const snackbarDelay = 5000

export interface SnackbarProps {
  snackbar: ISnackbar
  animationFrom?: 'left' | 'right' | 'none'
  className?: string
  transitionDuration: number
}

const Snackbar: FC<SnackbarProps> = ({ snackbar, animationFrom = 'none', className, transitionDuration }) => {
  const dispatch = useAppDispatch()
  const timer = useRef<any>(null)

  const [open, setOpen] = useState(true)
  const [timeRemaining, setTimeRemaining] = useState(snackbarDelay)
  const shouldRender = useMountTransition(open, transitionDuration)

  useEffect(() => {
    timer.current = window.setTimeout(() => {
      setOpen(false)
    }, timeRemaining)
    return () => {
      window.clearTimeout(timer.current)
    }
    // eslint-disable-next-line
  }, [])

  const getTransition = () => {
    if (open && shouldRender) {
      return { transform: 'translateX(0px)' }
    }
    if (animationFrom === 'left') {
      return { transform: 'translateX(-100%)' }
    } else if (animationFrom === 'right') {
      return { transform: 'translateX(100%)' }
    }
  }

  /* Pause timeout on hover */
  const onMouseEnter = () => {
    window.clearTimeout(timer.current)
    setTimeRemaining(5000)
  }

  const onMouseLeave = () => {
    timer.current = window.setTimeout(() => {
      setOpen(false)
    }, timeRemaining)
  }

  const getSnackbarTheme = (): string => {
    switch (snackbar.type) {
      case SnackbarType.SUCCESS:
        return SnackbarColor.SUCCESS
      case SnackbarType.WARNING:
        return SnackbarColor.WARNING
      case SnackbarType.ERROR:
        return SnackbarColor.ERROR
      case SnackbarType.INFO:
        return SnackbarColor.INFO
      default:
        return SnackbarColor.INFO
    }
  }

  return (
    <>
      {(shouldRender || open) && (
        <SnackbarContainer
          style={{
            ...getTransition(),
            transitionDuration: `${transitionDuration}ms`,
            backgroundColor: getSnackbarTheme(),
          }}
          className={className}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
        >
          {/* Snackbar content */}
          {snackbar?.close && (
            <Icon className="close" icon="close" onClick={() => dispatch(removeSnackbar(snackbar.id))} />
          )}
          {snackbar?.title}
          {snackbar?.body && (
            <span style={snackbar?.title ? { marginTop: '0.5rem' } : { marginTop: '0' }} className="body">
              {snackbar.body}
            </span>
          )}
          <div className="progress-line"></div>
        </SnackbarContainer>
      )}
    </>
  )
}

export default Snackbar
