import { FC } from 'react'

import { UserResponse } from '@/api/user/types'
import { getToken } from '@/features'
import { GlyphPreviewer } from '@/features/markdown/glyphPreviewer'
import { TGlyph } from '@/types/Glyph'

import { Comments } from '../comments'
import { WsComments } from '../wsComments'

type TProps = { glyph: TGlyph; user: UserResponse['data'] }

export const GlyphDetail: FC<TProps> = ({ glyph, user }) => {
  // lg:grid-cols-12 lg:px-0
  return (
    <div className="grid grid-cols-1 gap-10 justify-center mx-auto mb-10 px-5 w-2/3">
      {/* lg:col-span-7 lg:col-start-2  */}
      <div className="w-full">
        <GlyphPreviewer markdown={glyph.content} />
      </div>
      {/* lg:col-span-3 */}
      <div className="break-all">
        {glyph.is_study ? (
          <WsComments glyphId={glyph.id} user={user} />
        ) : (
          <Comments glyphId={glyph.id} userId={user.id} token={getToken()} />
        )}
      </div>
    </div>
  )
}
