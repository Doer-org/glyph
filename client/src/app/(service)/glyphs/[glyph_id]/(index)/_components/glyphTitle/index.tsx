import { GlyphResponse } from '@/api/glyph/types'
import { UserResponse } from '@/api/user/types'
import { StyledLinkTo } from '@/ui/StyledLinkTo'

type TProps = {
  glyph: GlyphResponse['data']
  user: UserResponse['data']
}

export const GlyphTitle = async ({ glyph, user }: TProps) => {
  const hasGlyph = glyph.author_id === user.id
  return (
    <>
      <h2 className="text-center pb-10 text-3xl font-bold">{glyph.title}</h2>
      {hasGlyph && (
        <div className="text-center mb-10">
          <StyledLinkTo href={`/glyphs/${glyph.id}/edit`}>編集</StyledLinkTo>
        </div>
      )}
    </>
  )
}
