import { apiRequest } from './Api'

export interface UrlResponse {
  url: string
}

export const generateUploadUrl = async () => apiRequest<undefined, UrlResponse>('get', 'generate-upload-url')

export const uploadImage = async (url: string, file: File): Promise<void> =>
  apiRequest<File, UrlResponse>('put', url, file, {
    headers: { 'Content-Type': 'multipart/form-data' },
    external: true,
  })
