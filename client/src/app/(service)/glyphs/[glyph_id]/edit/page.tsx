import dynamic from 'next/dynamic'

import { readGlyph } from '@/api/glyph'

const GlyphForm = dynamic(() => import('@/features/markdown/glyphForm'), { ssr: false })

export const metadata = { title: 'Glyph edit' }

type TProps = { params: { glyph_id: string }; searchParams: { id: string } }

const GlyphEditPage = async ({ params }: TProps) => {
  const glyph = await readGlyph(params.glyph_id)
  if (glyph.type === 'error') return <p>Glyphが取得できない</p>
  return (
    <div className="w-full lg:w-2/3 m-auto">
      <h2 className="text-3xl text-center pb-10 font-bold"> {glyph.value.data.title}(編集中)</h2>
      <GlyphForm glyph={glyph.value.data} actionKind="edit" />
    </div>
  )
}
export default GlyphEditPage
