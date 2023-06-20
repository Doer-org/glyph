import { getLoggedInUser } from '@/api'
import { getToken } from '@/api/utils/token'

import { User, UserComments, UserGlyphs } from './_component'

export default function UserSetting() {
  const user_id = '01GZ17MVNM8KWQMA43M2TRZWYP'
  const token = getToken()
  const user = getLoggedInUser(token)
  console.log(user)
  return (
    <>
      <User id={user_id} token={getToken()} />
      <div className="grid grid-cols-1 md:grid-cols-2 my-14">
        <UserGlyphs id={user_id} />
        <UserComments id={user_id} />
      </div>
    </>
  )
}
