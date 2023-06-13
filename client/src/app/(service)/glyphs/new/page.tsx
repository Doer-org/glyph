import { Txt } from '@/components/atoms/Txt'
import { NextPage } from 'next'
import dynamic from 'next/dynamic'

const GlyphCreateForm = dynamic(() => import('./_components/glyphCreateForm'), { ssr: false })
const GlyphNewPage: NextPage = () => {
  return (
    <>
      <Txt elm="h2" size="text-3xl" className="text-center pb-10">
        Glyph作成
      </Txt>
      <GlyphCreateForm />
    </>
  )
}
export default GlyphNewPage
