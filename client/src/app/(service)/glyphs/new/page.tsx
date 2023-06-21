import dynamic from 'next/dynamic'

import { getLoggedInUser } from '@/api'
import { getToken } from '@/api/utils/token'

const GlyphForm = dynamic(() => import('@/features/markdown/glyphForm'), { ssr: false })
const GlyphNewPage = async () => {
  const token = getToken()
  const user = await getLoggedInUser(token)
  if (user.type === 'error') return <p>userが取得できませんした</p>
  return (
    <div className="w-full lg:w-2/3 m-auto">
      <h2 className="text-3xl text-center pb-10 font-bold">Glyph作成</h2>
      <GlyphForm actionKind="create" user={user.value.user} />
    </div>
  )
}
export default GlyphNewPage
