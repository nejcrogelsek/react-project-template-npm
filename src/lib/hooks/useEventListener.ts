import { useEffect, useRef } from 'react'

//TODO: for callback type use: Generics
const useEventListener = (eventType: string, callback: (e: any) => void, element: Window | Document = window): any => {
  const callbackRef = useRef(callback)

  useEffect(() => {
    callbackRef.current = callback
  }, [callback])

  useEffect(() => {
    const handler = (e: any) => callbackRef.current(e)
    element.addEventListener(eventType, handler)

    return () => element.removeEventListener(eventType, handler)
  }, [eventType, element])
}

export default useEventListener
