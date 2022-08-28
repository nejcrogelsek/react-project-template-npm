import { Location, useLocation, useNavigate } from 'react-router-dom'

interface StateType {
  state: {
    onSuccess?: string
    onError?: string
  }
}

export function useRouter() {
  const navigate = useNavigate()
  const location = useLocation() as Location & StateType

  return {
    navigate,
    location,
  }
}
