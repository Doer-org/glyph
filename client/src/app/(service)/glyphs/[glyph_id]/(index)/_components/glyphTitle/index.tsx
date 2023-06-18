import { FC } from 'react'

import { GlyphResponse } from '@/api/glyph/types'
import { StyledLinkTo } from '@/ui/StyledLinkTo'

type TProps = {
  glyph: GlyphResponse['data']
}

export const GlyphTitle: FC<TProps> = ({ glyph }) => {
  return (
    <>
      <h2 className="text-center pb-10 text-3xl font-bold">{glyph.title}</h2>
      <div className="text-center mb-10">
        <StyledLinkTo href={`/glyphs/${glyph.id}/edit`}>編集</StyledLinkTo>
      </div>
    </>
  )
}
