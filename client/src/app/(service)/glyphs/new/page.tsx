import { NextPage } from 'next'
import dynamic from 'next/dynamic'

const GlyphForm = dynamic(() => import('@/features/markdown/glyphForm'), { ssr: false })

const GlyphNewPage: NextPage = () => {
  return (
    <div className="w-full lg:w-2/3 m-auto">
      <h2 className="text-3xl text-center pb-10 font-bold">Glyph作成</h2>
      <GlyphForm actionKind="create" />
    </div>
  )
}
export default GlyphNewPage
