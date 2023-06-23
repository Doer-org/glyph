import { FC } from 'react'

import { UserResponse } from '@/api/user/types'
import { getToken } from '@/features'
import { GlyphPreviewer } from '@/features/markdown/glyphPreviewer'
import { TGlyph } from '@/types/Glyph'

import { Comments } from '../comments'
import { WsComments } from '../wsComments'

type TProps = { glyph: TGlyph; user: UserResponse['data'] }

export const GlyphDetail: FC<TProps> = ({ glyph, user }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 justify-center px-5 lg:px-0">
      <div className="lg:col-span-6 lg:col-start-4">
        <GlyphPreviewer markdown={glyph.content} />
      </div>
      <div className="lg:col-span-2 break-all">
        {glyph.is_study ? (
          <WsComments glyphId={glyph.id} user={user} />
        ) : (
          <Comments glyphId={glyph.id} userId={user.id} token={getToken()} />
        )}
      </div>
    </div>
  )
}
