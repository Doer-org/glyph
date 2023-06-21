import { getCommentsByUserID, getGlyphsByAuthor, getLoggedInUser, readGlyph } from '@/api'
import { getToken } from '@/api/utils/token'

import { User } from './_component'
import { UserInfoWrapper } from './_component/userInfoWrapper'

export default async function UserSetting() {
  const token = getToken()
  const user = await getLoggedInUser(token)
  if (user.type === 'error') return <p>userが取得できませんした</p>

  const glyphsResp = await getGlyphsByAuthor(user.value.user.Id)
  if (glyphsResp.type === 'error') {
    return <p>Glyphが取得できませんでした</p>
  }
  const glyphs = glyphsResp.value.data

  const commentsResp = await getCommentsByUserID(user.value.user.Id)
  if (commentsResp.type === 'error') {
    return <p>Commentが取得できませんでした</p>
  }
  const comments = commentsResp.value.data

  // sectionbarみたいなの作って切り替えれるようにしたい
  return (
    <>
      <User user={user.value.user} />
      <UserInfoWrapper user={user.value.user} glyphs={glyphs} comments={comments} />
    </>
  )
}
