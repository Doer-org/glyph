import { getLoggedInUser } from '@/api'
import { readGlyph } from '@/api/glyph'
import { readUser } from '@/api/user'
import { getToken } from '@/features/auth'
import { StyledLinkTo } from '@/ui/StyledLinkTo'
import { Txt } from '@/ui/Txt'

import { GlyphDetail } from './_components/glyphDetail'

type TProps = {
  params: { glyph_id: string }
  searchParams: { id: string }
}

const GlyphPage = async ({ params }: TProps) => {
  const token = getToken()
  const userResp = await getLoggedInUser(token || '')
  if (userResp.type === 'error') throw new Error('ログインしてください')
  const loggedInUser = userResp.value.user
  const userInfo = await readUser(loggedInUser.Id, getToken())
  const u = {
    user_id: loggedInUser.Id,
    user_name: loggedInUser.Name,
    user_img: 'https://pbs.twimg.com/profile_images/1354479643882004483/Btnfm47p_400x400.jpg',
  }
  const glyph = await readGlyph(params.glyph_id)
  if (glyph.type === 'error') {
    return <p>Glyphが取得できない</p>
  }
  console.log(glyph)
  return (
    <>
      <Txt elm="h2" size="text-3xl" className="text-center pb-10">
        {glyph.value.data.title}
      </Txt>
      <div className="text-center mb-10">
        <StyledLinkTo href={`/glyphs/${glyph.value.data.id}/edit`}>編集</StyledLinkTo>
      </div>
      {/* //TODO: ユーザー情報を取得 */}
      <GlyphDetail glyph={glyph.value.data} user={u} />
    </>
  )
}
export default GlyphPage
