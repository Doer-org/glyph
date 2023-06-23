import { redirect } from 'next/navigation'

import { getLoggedInUser } from '@/api'

import { getToken } from '../utils/get-token'

type Props = {
  children: React.ReactNode
}

export const Auth = async (props: Props) => {
  const token = getToken()
  if (!token) redirect('/')
  const user = await getLoggedInUser(token || '')
  if (user.type === 'error') return redirect('/')
  return <>{props.children}</>
}
