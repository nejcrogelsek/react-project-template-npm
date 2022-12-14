import { useCallback, useEffect, useState } from 'react'

const emptyArray = [] as string[]

export function useApiCall<R, A extends any[]>(
  apiCall: (...args: A) => Promise<R>,
  args?: A,
  options?: {
    /**
     * Whether to skip/ignore this query.
     */
    skip?: boolean
  },
) {
  const skip = Boolean(options?.skip)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<any>(undefined)
  const [data, setData] = useState<R | undefined>(undefined)
  const [i, setI] = useState(0)

  const reload = useCallback(() => {
    setI(i + 1)
  }, [apiCall, i, ...(args || emptyArray)])

  useEffect(() => {
    if (!skip) {
      setLoading(true)
      apiCall
        .apply({}, args === undefined ? ([] as unknown as A) : args)
        .then((res) => {
          setLoading(false)
          setData(res)
        })
        .catch((err) => {
          setLoading(false)
          setError(err)
        })
    }
  }, [apiCall, i, ...(args || emptyArray), reload, skip])

  return {
    error,
    loading,
    args,
    data,
    reload,
  }
}
