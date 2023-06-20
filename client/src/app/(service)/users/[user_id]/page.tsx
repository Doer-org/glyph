import { getLoggedInUser } from '@/api'
import { getToken } from '@/api/utils/token'

import { User, UserComments, UserGlyphs } from './_component'

export default async function UserSetting() {
  const token = getToken()
  const user = await getLoggedInUser(token).catch((error) => {
    throw Error(error)
  })
  console.log(user)
  if (user.type === 'error') return <p>userが取得できませんした</p>

  return (
    <>
      <User id={user.value.user.Id} token={getToken()} />
      <div className="grid grid-cols-1 md:grid-cols-2 my-14">
        <UserGlyphs id={user.value.user.Id} />
        <UserComments id={user.value.user.Id} />
      </div>
    </>
  )
}
