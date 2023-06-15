import { ChangeEvent, useState } from 'react'

export const useInput = (initialValue = '') => {
  const [value, setValue] = useState(initialValue)

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value)
  }

  const removeValue = () => {
    setValue('')
  }

  return {
    value,
    onChange,
    removeValue,
  }
}
