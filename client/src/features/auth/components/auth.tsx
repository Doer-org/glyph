import { redirect } from 'next/navigation'

import { getToken } from '../utils/get-token'
type Props = {
  children: React.ReactNode
}

export const Auth = async (props: Props) => {
  const token = getToken()
  if (!token) redirect('/')
  return <>{props.children}</>
}
