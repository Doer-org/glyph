'use client'
import { format } from 'date-fns'
import { FC, useState } from 'react'

import { TGlyph } from '@/types/Glyph'
import { PopLinkTo } from '@/ui/LinkTo/components/popLinkTo'

type UserGlyphsProps = {
  id: string
}

export const UserGlyphs: FC<UserGlyphsProps> = ({ id }) => {
  const [glyphs, setGlyphs] = useState<TGlyph[] | null>(null)

  const testglyphs: TGlyph[] = [
    {
      id: '1',
      author_id: 'test',
      title: 'test',
      content: 'test',
      status: 'Draft',
      is_study: false,
      prev_glyph: '',
      next_glyph: '',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
    {
      id: '2',
      author_id: 'test',
      title: 'test',
      content: 'test',
      status: 'Draft',
      is_study: false,
      prev_glyph: '',
      next_glyph: '',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
  ]
  return (
    <div className="flex flex-col gap-5">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {testglyphs?.map((glyph: TGlyph) => (
          <PopLinkTo href={`glyphs/${glyph.id}`} className="block w-full" key={glyph.id}>
            <h2 className="text-2xl font-bold">{glyph.title}</h2>
            <p className="text-sm"> - {glyph.content.length}文字</p>
            <p className="text-sm"> - {format(new Date(glyph.updated_at), 'yyyy/MM/dd')}</p>
          </PopLinkTo>
        ))}
      </div>
    </div>
  )
}
