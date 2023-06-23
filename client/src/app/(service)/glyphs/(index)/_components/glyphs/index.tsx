import { readAllGlyphs } from '@/api/glyph'
import { getToken } from '@/api/utils/token'
import { TGlyph } from '@/types/Glyph'

import { Glyph } from '../glyph'

export const Glyphs = async () => {
  const glyphs = await readAllGlyphs()
  const token = getToken()
  if (glyphs.type === 'error') return new Error('Glyphを取得できませんでした')
  if (!glyphs.value.data) return <p>データがありません</p>

  // const userImgs = await Promise.all(
  //   glyphs.value.data.map(async (glyph: TGlyph) => {
  //     const user = await readUser(glyph.author_id, token)
  //     if (user.type === 'error') {
  //       return null
  //     }
  //     return user.value.data.img
  //   })
  // )

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 my-10">
      {glyphs.value.data.map((glyph: TGlyph) => {
        return (
          <>
            {/* @ts-expect-error Server Component */}
            <Glyph glyph={glyph} key={glyph.id} token={token} />
          </>
        )
      })}
    </div>
  )
}
