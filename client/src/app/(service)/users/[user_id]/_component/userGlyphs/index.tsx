'use client'
import { format } from 'date-fns'
import { FC } from 'react'

import { TGlyph } from '@/types/Glyph'
import { PopLinkTo } from '@/ui/LinkTo/components/popLinkTo'

type UserGlyphsProps = {
  glyphs: TGlyph[] | null
}

export const UserGlyphs: FC<UserGlyphsProps> = ({ glyphs }) => {
  return (
    <div className="flex flex-col gap-5">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {glyphs ? (
          glyphs?.map((glyph: TGlyph) => (
            <PopLinkTo href={`/glyphs/${glyph.id}`} className="block w-full" key={glyph.id}>
              <h2 className="text-2xl font-bold">{glyph.title}</h2>
              <p className="text-sm"> - {glyph.content.length}文字</p>
              <p className="text-sm"> - {format(new Date(glyph.updated_at), 'yyyy/MM/dd')}</p>
            </PopLinkTo>
          ))
        ) : (
          <p>まだGlyphを作成していません</p>
        )}
      </div>
    </div>
  )
}
