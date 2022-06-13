import { useState, useEffect } from 'react'

export default function useDisableButton(initialState = false) {
  const [disabled, setDisabled] = useState(initialState)
  useEffect(() => {
    let timeId
    if (disabled) {
      timeId = setTimeout(() => setDisabled(false), 1000)
    }
    return () => {
      if (timeId) clearTimeout(timeId)
    }
  }, [disabled])
  return [disabled, setDisabled]
}
