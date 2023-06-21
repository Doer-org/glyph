import dynamic from 'next/dynamic'

import { getLoggedInUser } from '@/api'
import { readGlyph } from '@/api/glyph'
import { getToken } from '@/api/utils/token'

const GlyphForm = dynamic(() => import('@/features/markdown/glyphForm'), { ssr: false })

export const metadata = { title: 'Glyph edit' }

type TProps = { params: { glyph_id: string }; searchParams: { id: string } }

const GlyphEditPage = async ({ params }: TProps) => {
  const glyph = await readGlyph(params.glyph_id)
  const token = getToken()
  const user = await getLoggedInUser(token)
  if (user.type === 'error') return <p>userが取得できませんした</p>
  if (glyph.type === 'error') return <p>Glyphが取得できない</p>
  return (
    <div className="w-full lg:w-2/3 m-auto">
      <h2 className="text-3xl text-center pb-10 font-bold"> {glyph.value.data.title}(編集中)</h2>
      <GlyphForm glyph={glyph.value.data} actionKind="edit" user={user.value.user} />
    </div>
  )
}
export default GlyphEditPage
