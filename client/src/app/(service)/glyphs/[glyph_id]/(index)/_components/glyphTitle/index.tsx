'use client'
import { useRouter } from 'next/navigation'

import { deleteGlyph } from '@/api'
import { GlyphResponse } from '@/api/glyph/types'
import { UserResponse } from '@/api/user/types'
import { StyledLinkTo } from '@/ui/StyledLinkTo'

type TProps = {
  glyph: GlyphResponse['data']
  user: UserResponse['data']
  token?: string
}

export const GlyphTitle = ({ glyph, user, token }: TProps) => {
  const router = useRouter()
  const hasGlyph = glyph.author_id === user.id

  return (
    <>
      <h2 className="text-center pb-10 text-3xl font-bold">{glyph.title}</h2>
      {hasGlyph && (
        <div className="text-center mb-10 flex gap-5 justify-center">
          <StyledLinkTo href={`/glyphs/${glyph.id}/edit`}>編集</StyledLinkTo>

          <button
            className="border-2 rounded-md hover:bg-yellow-300 py-2 px-7 hover:scale-125 transition"
            onClick={() => {
              deleteGlyph(glyph.id, token).then(() => {
                router.push('/glyphs')
              })
            }}
          >
            削除
          </button>
        </div>
      )}
    </>
  )
}
