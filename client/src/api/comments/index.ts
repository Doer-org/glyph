import { apiClient } from '../core';

import { CommentResponse, CommentCreate, CommentsResponse } from './types';

export const postComment = async (comment: CommentCreate) =>
  await apiClient.post<CommentResponse>(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/comments/`,
    comment
  );

export const getCommentsByGlyphId = async (glyph_id: string) =>
  await apiClient.get<CommentsResponse>(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/comments/glyphs/${glyph_id}`
  );

export const getCommentsByUserID = async (user_id: string) =>
  await apiClient.get<CommentsResponse>(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/comments/users/${user_id}`
  );
