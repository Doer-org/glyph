import { getEnv } from '@/utils'
import { redirect } from 'next/navigation'
import { getToken } from '../utils/get-token'
const { clientURL } = getEnv()
type Props = {
  children: React.ReactNode
}

export const Auth = async (props: Props) => {
  const token = getToken()
  if (!token) redirect(`${clientURL}`)
  return <>{props.children}</>
}
