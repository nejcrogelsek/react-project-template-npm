import { useEffect } from 'react'

import { useRouter } from './useRouter'
export const useScrollToTop = () => {
  const { location } = useRouter()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location.pathname])
}
