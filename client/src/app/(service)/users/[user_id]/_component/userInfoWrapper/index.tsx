'use client'

import { FC, useState } from 'react'

import { TComment } from '@/types/Comment'
import { TGlyph } from '@/types/Glyph'
import { TUser } from '@/types/User'

import { UserComments } from '../userComments'
import { UserGlyphs } from '../userGlyphs'

type TProps = { user: TUser; glyphs: TGlyph[] | null; comments: TComment[] | null }

export const UserInfoWrapper: FC<TProps> = ({ user, glyphs, comments }) => {
  const [userInfo, setUserInfo] = useState('Glyph')
  const isGlyph = userInfo === 'Glyph'
  const isComment = userInfo === 'Comment'

  return (
    <div>
      <div className="flex gap-5 border-b-2 border-black pb-2 font-semibold">
        <a onClick={() => setUserInfo('Glyph')} className={`cursor-pointer ${isGlyph ? '' : 'opacity-60'}`}>
          Glyph
        </a>
        <a onClick={() => setUserInfo('Comment')} className={`cursor-pointer ${isComment ? '' : 'opacity-60'}`}>
          Comment
        </a>
      </div>
      <div className="mt-5">
        {isGlyph && <UserGlyphs glyphs={glyphs} />}
        {isComment && <UserComments comments={comments} />}
      </div>
    </div>
  )
}
