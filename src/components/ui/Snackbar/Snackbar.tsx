import { observer } from 'mobx-react'
import { Snackbar as ISnackbar, SnackbarColor, SnackbarType } from 'models/Snackbar'
import { FC, useEffect, useRef, useState } from 'react'
import useMountTransition from 'utils/useMountTransition'

import { SnackbarContainer } from './styles'

const snackbarDelay = 5000

export interface SnackbarProps {
  snackbar: ISnackbar
  animationFrom?: 'left' | 'right' | 'none'
  className?: string
  transitionDuration: number
}

const Snackbar: FC<SnackbarProps> = ({ snackbar, animationFrom = 'none', className, transitionDuration }) => {
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
          {snackbar?.title}
          <div className="progress-line"></div>
        </SnackbarContainer>
      )}
    </>
  )
}

export default observer(Snackbar)
