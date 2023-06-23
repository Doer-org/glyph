import { useState } from 'react'

export const useLoadingStatus = (initialValue: boolean = false) => {
  const [loadingStatus, setLoadingStatus] = useState(initialValue)

  const changeLoadingStatus = () => setLoadingStatus(true)
  return { loadingStatus, changeLoadingStatus }
}
