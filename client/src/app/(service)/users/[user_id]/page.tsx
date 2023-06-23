import { getCommentsByUserID, getGlyphsByAuthor, readUser } from '@/api'
import { getToken } from '@/api/utils/token'

import { User } from './_component'
import { UserInfoWrapper } from './_component/userInfoWrapper'

type Props = {
  params: { user_id: string }
}

export default async function UserSetting({ params: { user_id } }: Props) {
  const userResp = await readUser(user_id, getToken())
  if (userResp.type === 'error') return <p>userが取得できませんした</p>
  const user = { Id: userResp.value.data.id, Name: userResp.value.data.name, Img: userResp.value.data.img }

  const glyphsResp = await getGlyphsByAuthor(user_id)
  if (glyphsResp.type === 'error') {
    return <p>Glyphが取得できませんでした</p>
  }
  const glyphs = glyphsResp.value.data

  const commentsResp = await getCommentsByUserID(user_id)
  if (commentsResp.type === 'error') {
    return <p>Commentが取得できませんでした</p>
  }
  const comments = commentsResp.value.data

  // sectionbarみたいなの作って切り替えれるようにしたい
  return (
    <>
      <User user={user} />
      <UserInfoWrapper user={user} glyphs={glyphs} comments={comments} />
    </>
  )
}
