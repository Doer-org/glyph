import { readAllGlyphs } from '@/api/glyph'
import { TGlyph } from '@/types/Glyph'

import { Glyph } from '../glyph'

export const Glyphs = async () => {
  // Error: 環境変数が読み込めてなくてURLのパースに失敗するよって感じでビルドこける
  const glyphs = await readAllGlyphs()

  if (glyphs.type === 'error') return new Error('Glyphを取得できませんでした')

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 my-10">
      {glyphs.value.data.map((glyph: TGlyph) => {
        return <Glyph glyph={glyph} key={glyph.id} />
      })}
    </div>
  )
}
