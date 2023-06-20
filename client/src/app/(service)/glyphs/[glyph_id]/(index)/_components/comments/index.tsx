'use client'
import { useEffect, useState } from 'react'

import * as API from '@/api'

import { CommentBox } from '../commentBox'
import { CommentContents } from '../commentContents'
import { CommentInput } from '../commentInput'

type TProps = { glyphId: string; userId: string; token?: string }

type TCommentUser = {
  id: string
  user_id: string
  glyph_id: string
  contents: string
  created_at: string
  user?: TUser
}

type TUser = {
  id: string
  name: string
  img?: string
}

export const Comments = ({ glyphId, userId, token }: TProps) => {
  const [commentContents, setCommentContents] = useState<TCommentUser[]>([])

  useEffect(() => {
    const fetchUserComments = async () => {
      return await API.getCommentsByGlyphId(glyphId).then(async (result) => {
        if (result.type === 'error') return
        if (result.value.data === null) return
        return (
          result.type === 'ok' &&
          (await Promise.all(
            result.value.data.map(async (comment) => {
              const user = await API.readUser(comment.user_id, token)
              return { ...comment, user: (user.type === 'ok' && user.value.data) || undefined }
            })
          ))
        )
      })
    }
    fetchUserComments()
  }, [glyphId, token])

  const createComment = (comment: string) => {
    API.postComment({ user_id: userId, glyph_id: glyphId, contents: comment }).then(async (result) => {
      if (result.type === 'error') return
      const user = await API.readUser(result.value.data.user_id, token)
      const userComments = { ...result.value.data, user: (user.type === 'ok' && user.value.data) || undefined }
      setCommentContents([...commentContents, userComments])
    })
  }

  return (
    <>
      <CommentBox>
        <CommentContents comments={commentContents} />
      </CommentBox>
      <CommentInput sendComment={createComment} />
    </>
  )
}
