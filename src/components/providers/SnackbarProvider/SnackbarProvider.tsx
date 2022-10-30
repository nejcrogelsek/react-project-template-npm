import { SnackbarProvider as SnackbarProviderContainer } from 'components/providers/SnackbarProvider/styles'
import Snackbar from 'components/ui/Snackbar/Snackbar'
import { FC, ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { useAppSelector } from 'store/app/hooks'

interface SnackbarPosition {
  vertical: 'top' | 'center' | 'bottom'
  horizontal: 'left' | 'center' | 'right'
}

interface SnackbarProviderProps {
  children: ReactNode
  className?: string
  position?: SnackbarPosition
  transitionDuration?: number
}

const SnackbarProvider: FC<SnackbarProviderProps> = ({
  children,
  className,
  position = { vertical: 'top', horizontal: 'right' },
  transitionDuration = 300,
}) => {
  const snackbars = useAppSelector((state) => state.global.snackbars)

  const getFlexPosition = (pos: string) => {
    switch (pos) {
      case 'right':
      case 'bottom':
        return 'flex-end'
      case 'top':
      case 'left':
        return 'flex-start'
      case 'center':
        return 'center'
    }
  }

  const getSnackbarTransition = position.horizontal === 'center' ? 'none' : position.horizontal

  return (
    <>
      {children}
      {snackbars.length > 0 &&
        createPortal(
          <SnackbarProviderContainer
            style={{
              alignItems: getFlexPosition(position.horizontal),
              justifyContent: getFlexPosition(position.vertical),
            }}
            className={className}
          >
            {snackbars.map((snackbar, index) => (
              <Snackbar
                key={index}
                snackbar={snackbar}
                animationFrom={getSnackbarTransition}
                transitionDuration={transitionDuration}
              />
            ))}
          </SnackbarProviderContainer>,
          document.body,
        )}
    </>
  )
}

export default SnackbarProvider
