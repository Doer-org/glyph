import { getLoggedInUser } from '@/api'
import { getToken } from '@/api/utils/token'

import { User } from './_component'
import { UserInfoWrapper } from './_component/userInfoWrapper'

export default async function UserSetting() {
  const token = getToken()
  const user = await getLoggedInUser(token)
  if (user.type === 'error') return <p>userが取得できませんした</p>

  // sectionbarみたいなの作って切り替えれるようにしたい

  return (
    <>
      <User user={user.value.user} />
      <UserInfoWrapper user={user.value.user} />
    </>
  )
}
