import { useEffect, useRef, useState } from 'react'

const useMountTransition = (isMounted: boolean, delayTime: number): boolean => {
  const [shouldRender, setShouldRender] = useState(false)
  const timer = useRef<number>()

  useEffect(() => {
    if (isMounted && !shouldRender) {
      timer.current = window.setTimeout(() => setShouldRender(true), 1)
    } else if (!isMounted && shouldRender) {
      timer.current = window.setTimeout(() => setShouldRender(false), delayTime)
    }
    return () => window.clearTimeout(timer.current)
  }, [isMounted, delayTime, shouldRender])

  return shouldRender
}

export default useMountTransition
