import { getEnv } from '@/utils'

import { apiClient } from '../core'

import { CommentCreate, CommentResponse, CommentsResponse } from './types'

const { serverURL } = getEnv()

export const postComment = async (comment: CommentCreate) =>
  await apiClient.post<CommentResponse>(`${serverURL}/comments/`, comment)

export const getCommentsByGlyphId = async (glyph_id: string) =>
  await apiClient.get<CommentsResponse>(`${serverURL}/comments/glyphs/${glyph_id}`)

export const getCommentsByUserID = async (user_id: string) =>
  await apiClient.get<CommentsResponse>(`${serverURL}/comments/users/${user_id}`)
