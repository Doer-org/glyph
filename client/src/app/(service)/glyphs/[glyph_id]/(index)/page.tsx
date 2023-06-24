import { getLoggedInUser, readUser } from '@/api'
import { readGlyph } from '@/api/glyph'
import { getToken } from '@/features/auth'

import { GlyphTitle } from './_components'
import { GlyphDetail } from './_components/glyphDetail'

type TProps = {
  params: { glyph_id: string }
  searchParams: { id: string }
}

const GlyphPage = async ({ params }: TProps) => {
  // TODO: 処理が多いように見えるが背景が見えてないので一旦このままで
  const token = getToken()
  const userResp = await getLoggedInUser(token || '')
  if (userResp.type === 'error') return <p>ユーザーが取得できませんでした。ログインしてください</p>
  const loggedInUser = userResp.value.user
  const user = await readUser(loggedInUser.Id, getToken())
  const glyph = await readGlyph(params.glyph_id)
  if (user.type === 'error') return <p>ユーザーが取得できない</p>
  if (glyph.type === 'error') return <p>Glyphが取得できない</p>

  return (
    <>
      <GlyphTitle glyph={glyph.value.data} user={user.value.data} token={token} />
      <GlyphDetail glyph={glyph.value.data} user={user.value.data} />
    </>
  )
}
export default GlyphPage
