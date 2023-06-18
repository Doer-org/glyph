'use client'
import { FC, useEffect, useState } from 'react'

import * as API from '@/api'

import { CommentBox } from '../commentBox'
import { CommentInput } from '../commentInput'

type Comment = {
  id: string
  user_id: string
  glyph_id: string
  contents: string
  created_at: string
  user?: {
    id: string
    name: string
    img?: string
  }
}

type TProps = {
  glyphId: string
  userId: string
  token?: string
}

export const Comments: FC<TProps> = ({ glyphId, userId, token }: TProps) => {
  const [comments, setComments] = useState<Comment[]>([])
  useEffect(() => {
    ;(async () => {
      const comments = await API.getCommentsByGlyphId(glyphId)
      console.log('comments', comments)
      if (comments.type === 'error') return

      if (!comments.value.data) {
        setComments([])
        return
      }
      const commentsAndUsers = await Promise.all(
        comments.value.data.map(async (comment) => {
          const user = await API.readUser(comment.user_id, token)
          return { ...comment, user: (user.type === 'ok' && user.value.data) || undefined }
        })
      )
      setComments(commentsAndUsers)
    })()
  }, [glyphId, token])

  // const scrollLastCommentRef = useRef<HTMLParagraphElement>(null)
  // useEffect(() => {
  //   scrollLastCommentRef?.current?.scrollIntoView()
  // }, [comments])
  return (
    <>
      <CommentBox>
        {comments.map((comment, index) => {
          return (
            <div key={`${comment}-${index}`}>
              <p className="border-2 p-2 rounded-md my-2">{comment.contents}</p>
            </div>
          )
        })}
      </CommentBox>
      <CommentInput
        sendComment={(comment) =>
          API.postComment({
            user_id: userId,
            glyph_id: glyphId,
            contents: comment,
          })
        }
      />
    </>
  )
}
