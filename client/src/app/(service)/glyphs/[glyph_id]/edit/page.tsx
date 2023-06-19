import dynamic from 'next/dynamic'

import { readGlyph } from '@/api/glyph'
import { Txt } from '@/ui/Txt'
const GlyphEditForm = dynamic(() => import('./_components/glyphEditForm'), { ssr: false })

export const metadata = {
  title: 'Glyph edit',
}
type TProps = {
  params: { glyph_id: string }
  searchParams: { id: string }
}
const GlyphEditPage = async ({ params }: TProps) => {
  const glyph = await readGlyph(params.glyph_id)
  if (glyph.type === 'error') {
    return <p>Glyphが取得できない</p>
  }
  return (
    <>
      <Txt elm="h2" size="text-3xl" className="text-center pb-10">
        {glyph.value.data.title}(編集中)
      </Txt>
      <GlyphEditForm glyph={glyph.value.data} />
    </>
  )
}
export default GlyphEditPage
