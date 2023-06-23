'use client'

import { FC, useState } from 'react'

import { TComment } from '@/types/Comment'
import { TGlyph } from '@/types/Glyph'
import { TUser } from '@/types/User'

import { UserComments } from '../userComments'
import { UserGlyphs } from '../userGlyphs'

type TProps = { user: TUser; glyphs: TGlyph[] | null; comments: TComment[] | null }

export const UserInfoWrapper: FC<TProps> = ({ user, glyphs, comments }) => {
  const [userInfo, setUserInfo] = useState<'Glyph' | 'Comment'>('Glyph')
  return (
    <div>
      <div className="flex gap-5 border-b-2 border-black pb-2 font-semibold">
        <a
          onClick={() => setUserInfo('Glyph')}
          className={`cursor-pointer ${userInfo === 'Glyph' ? '' : 'opacity-60'}`}
        >
          Glyph
        </a>
        <a
          onClick={() => setUserInfo('Comment')}
          className={`cursor-pointer ${userInfo === 'Comment' ? '' : 'opacity-60'}`}
        >
          Comment
        </a>
      </div>
      <div className="mt-5">
        {userInfo === 'Glyph' ? (
          <UserGlyphs glyphs={glyphs} />
        ) : (
          (comments && <UserComments comments={comments} />) || <p>まだコメントがありません</p>
        )}
      </div>
    </div>
  )
}
