import { useState } from 'react'

export const useToggle = (initialValue: boolean = false) => {
  const [bool, setBool] = useState(initialValue)

  const toggle = () => setBool(!bool)
  const toTrue = () => setBool(true)
  const toFalse = () => setBool(false)
  return { bool, toggle, toTrue, toFalse }
}
