import dynamic from 'next/dynamic'
import { FC } from 'react'

import { TUser } from '@/types/User'

const GlyphForm = dynamic(() => import('@/features/markdown/glyphForm'), { ssr: false })
type TProps = { user: TUser }
export const GlyphCreateForm: FC<TProps> = ({ user }) => {
  return (
    <div>
      <GlyphForm actionKind="create" user={user} />
    </div>
  )
}
