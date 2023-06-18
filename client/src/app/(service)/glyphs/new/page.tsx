import { NextPage } from 'next'
import dynamic from 'next/dynamic'

const GlyphForm = dynamic(() => import('@/features/markdown/glyphForm'), { ssr: false })

const GlyphNewPage: NextPage = () => {
  return (
    <>
      <h2 className="text-3xl text-center pb-10 font-bold">Glyph作成</h2>
      <GlyphForm actionKind="create" />
    </>
  )
}
export default GlyphNewPage
