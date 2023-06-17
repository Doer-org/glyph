'use client'
import { FC } from 'react'

import { UserResponse } from '@/api/user/types'

import { CommentBox } from '../commentBox'
import { CommentInput } from '../commentInput'

import { useWebSocketComments } from './hooks'

type TProps = { glyphId: string; user: UserResponse['data'] }

export const WsComments: FC<TProps> = ({ glyphId, user }) => {
  const { sendComment, wsComments } = useWebSocketComments({ glyphId, user })

  return (
    <div className="fixed break-all">
      <CommentBox>
        {wsComments.map((comment, index) => {
          return (
            <p className="border-2 p-2 rounded-md my-2 break-all" key={`${comment.data.comment}-${index}`}>
              {comment.data.comment}
            </p>
          )
        })}
      </CommentBox>
      <CommentInput sendComment={sendComment} />
    </div>
  )
}
