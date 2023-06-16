'use client'
import { UserResponse } from '@/api/user/types'
import { SvgLogo } from '@/ui/svgs/SvgLogo'
import { FC } from 'react'
import { CommentBox } from '../commentBox'
import { CommentInput } from '../commentInput'
import { useWebSocketComments } from './hooks'

type TProps = { glyphId: string; user: UserResponse['data'] }

export const WsComments: FC<TProps> = ({ glyphId, user }) => {
  const { sendComment, wsComments } = useWebSocketComments({ glyphId, user })

  return (
    <div className=" fixed">
      <CommentBox>
        {wsComments.map((comment, index) => {
          return (
            <div
              key={`${comment.data.comment}-${index}`}
              style={{
                display: 'flex',
                flexDirection: 'row',
                height: '4rem',
                alignItems: 'center',
                columnGap: '0.5rem',
              }}
            >
              <SvgLogo />
              <p className="border-2 p-2 rounded-md my-2 break-words">
                {comment.data.userName}: {comment.data.comment}
              </p>
            </div>
          )
        })}
      </CommentBox>
      <CommentInput sendComment={sendComment} />
    </div>
  )
}
