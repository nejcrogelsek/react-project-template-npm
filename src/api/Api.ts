import Axios, { AxiosRequestHeaders } from 'axios'

export async function apiRequest<D = Record<string, unknown>, R = unknown>(
  method: 'get' | 'delete' | 'head' | 'options' | 'post' | 'put' | 'patch',
  path: string,
  input?: D,
  options?: {
    headers?: AxiosRequestHeaders
    external?: boolean
  },
) {
  try {
    const res = await Axios.request<R>({
      url: options?.external ? path : `${process.env.REACT_APP_API_URL}/${path}`,
      method: method,
      data: input,
      headers: options?.headers,
      withCredentials: true,
    })
    return res.data
  } catch (error: any) {
    return error.response ? error.response.data : error
  }
}

export * from './UploadImage'
export * from './User'
