import { format } from 'date-fns'
import Image from 'next/image'
import { FC } from 'react'

import { TGlyph } from '@/types/Glyph'
import { PopLinkTo } from '@/ui/LinkTo/components/popLinkTo'

import { GlyphStatus } from '../glyphStatus'

type TProps = { glyph: TGlyph; avatar: string | null }

export const Glyph: FC<TProps> = ({ glyph, avatar }) => {
  return (
    <PopLinkTo href={`/glyphs/${glyph.id}`}>
      {avatar ? (
        <div className="w-14 h-14 m-auto rounded-full flex items-center justify-center mb-3">
          <Image src={avatar} alt="avatar" width={56} height={56} className="rounded-full" />
        </div>
      ) : (
        <div className="w-14 h-14 m-auto rounded-full bg-[#3A3A3A] flex items-center justify-center mb-3">
          <p className="font-bold text-[#FFF500]">{glyph.title[0]}</p>
        </div>
      )}
      <h2 className="text-xl font-bold my-5 text-center">
        {glyph.title.length >= 10 ? glyph.title.slice(0, 20) + '...' : glyph.title}
      </h2>
      <p className="text-sm">文字数: {glyph.content.length}文字</p>
      <p className="text-sm">作成日: {format(new Date(glyph.updated_at), 'yyyy/MM/dd')}</p>
      <div className="mt-5 flex gap-5">
        {glyph.is_study && <GlyphStatus text="勉強会中" className="bg-red-300" />}
        {glyph.status === 'Public' && <GlyphStatus text="公開中" className="bg-lime-300" />}
        {glyph.status === 'Private' && <GlyphStatus text="非公開" className="bg-orange-200" />}
        {glyph.status === 'Draft' && <GlyphStatus text="下書き" className="bg-orange-200" />}
      </div>
    </PopLinkTo>
  )
}
