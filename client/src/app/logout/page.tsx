import { redirect } from 'next/navigation'

import { logout } from '@/api'
import { getToken } from '@/features'

const Page = async () => {
  const token = getToken()
  if (!token) redirect('/')
  const _ = await logout(token)
  redirect('/')
}

export default Page
