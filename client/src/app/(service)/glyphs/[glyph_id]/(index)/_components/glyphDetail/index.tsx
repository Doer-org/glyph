import { FC } from 'react'

import { getToken } from '@/api/utils/token'
import { GlyphPreviewer } from '@/features/markdown/glyphPreviewer'
import { TGlyph } from '@/types/Glyph'

import { Comments } from '../comments'
import { WsComments } from '../wsComments'

type TProps = {
  glyph: TGlyph
  user: {
    user_id: string
    user_name: string
    user_img: string
  }
}

export const GlyphDetail: FC<TProps> = (props: TProps) => {
  return (
    <div className="lg:flex block">
      <div className="lg:w-2/3 w-full">
        <GlyphPreviewer markdown={props.glyph.content} />
      </div>
      <div className="lg:w-1/3 lg:my-0 w-full my-10 ">
        <div className="lg:ml-2 transition">
          {props.glyph.is_study ? (
            // trueならwebsocketを扱うcommentsを返す
            <WsComments glyphId={props.glyph.id} user={props.user} />
          ) : (
            <Comments glyphId={props.glyph.id} user_id={props.user.user_id} token={getToken()} />
          )}
        </div>
      </div>
    </div>
  )
}
