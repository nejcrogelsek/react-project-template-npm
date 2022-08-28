import { FC, useEffect, useState } from 'react'

interface Props {
  value: string
}

const InputValidation: FC<Props> = ({ value }: Props) => {
  const [validation, setValidation] = useState({
    characters: false,
    uppercase: false,
    numbers: false,
    symbols: false,
  })

  const handleValidation = (e: any) => {
    const t = value
    console.log(value)
    if (t.length >= 6) {
      setValidation((prev) => ({ ...prev, characters: true }))
    } else {
      setValidation((prev) => ({ ...prev, characters: false }))
    }

    if (/[A-Z]/.test(t)) {
      setValidation((prev) => ({ ...prev, uppercase: true }))
    } else {
      setValidation((prev) => ({ ...prev, uppercase: false }))
    }

    if (/[0-9]/.test(t)) {
      setValidation((prev) => ({ ...prev, numbers: true }))
    } else {
      setValidation((prev) => ({ ...prev, numbers: false }))
    }

    if (/[^A-Za-z0-9]/.test(t)) {
      setValidation((prev) => ({ ...prev, symbols: true }))
    } else {
      setValidation((prev) => ({ ...prev, symbols: false }))
    }
  }

  useEffect(() => {
    handleValidation(value)
  }, [value])

  return (
    <ul>
      <li style={validation.characters ? { color: 'green' } : { color: 'black' }}>Minimum of 6 characters.</li>
      <li style={validation.uppercase ? { color: 'green' } : { color: 'black' }}>At least 1 uppercase letter.</li>
      <li style={validation.numbers ? { color: 'green' } : { color: 'black' }}>At least 1 number.</li>
      <li style={validation.symbols ? { color: 'green' } : { color: 'black' }}>At least 1 symbol.</li>
    </ul>
  )
}

export default InputValidation
