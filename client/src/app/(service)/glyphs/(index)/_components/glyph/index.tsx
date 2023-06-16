import { TGlyph } from '@/types/Glyph'
import { LinkTo } from '@/ui/LinkTo'
import { format } from 'date-fns'
import { FC } from 'react'
import { GlyphStatus } from '../glyphStatus'

type TProps = { glyph: TGlyph }

export const Glyph: FC<TProps> = ({ glyph }) => {
  return (
    <LinkTo
      href={`/glyphs/${glyph.id}`}
      className="w-full shadow-origin rounded-md hover:cursor-pointer p-3 border-neutral-700 border-2 translate-x-0 translate-y-0 hover:translate-x-4 hover:translate-y-4 hover:shadow-inherit transition
       shadow-neutral-700 hover:opacity-90"
    >
      <div className="w-14 h-14 m-auto rounded-full bg-[#3A3A3A] flex items-center justify-center mb-3">
        <p className="font-bold text-[#FFF500]">{glyph.title[0]}</p>
      </div>
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
    </LinkTo>
  )
}
