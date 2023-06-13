import { readAllGlyphs } from '@/api/glyph'
import { StyledLinkTo } from '@/ui/StyledLinkTo'
import { Txt } from '@/ui/Txt'
import { Glyphs } from './_components/glyphs'

const GlyphsPage = async () => {
  // 環境変数が読み込めてなくてURLのパースに失敗するよって感じでビルドこける
  const glyphs = await readAllGlyphs()
  if (glyphs.type === 'error') {
    return new Error('Glyphを取得できませんでした')
  }

  return (
    <>
      <Txt elm="h2" size="text-3xl" className="text-center pb-10">
        Glyph一覧
      </Txt>
      <div className="text-center mb-10">
        <StyledLinkTo href="/glyphs/new">Glyph作成</StyledLinkTo>
      </div>
      {glyphs.value.data === null ? <p>Glyphがありません</p> : <Glyphs glyphs={glyphs.value.data} />}
    </>
  )
}
export default GlyphsPage
