import { ChangeEvent, Dispatch, SetStateAction } from 'react'

export const fileSelected = async (e: ChangeEvent, setFile: Dispatch<SetStateAction<File | null>>) => {
  const target = e.target as HTMLInputElement
  const file = (target.files as FileList)[0]
  if (file && file.type.substr(0, 5) === 'image') {
    setFile(file)
  } else {
    setFile(null)
  }
}
