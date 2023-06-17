import { NextPage } from 'next'
import dynamic from 'next/dynamic'

import { Txt } from '@/ui/Txt'

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
