import { JTDDataType } from 'ajv/dist/core';

const commentBaseSchema = {
  type: 'object',
  properties: {
    id: { type: 'string' },
    author_id: { type: 'string' },
    glyph_id: { type: 'string' },
    contents: { type: 'string' },
    created_at: { type: 'string' },
  },
};

const commentResponseSchema = {
  type: 'object',
  properties: {
    data: commentBaseSchema,
  },
} as const;

const commentsResponseSchema = {
  type: 'object',
  properties: {
    data: {
      elements: commentBaseSchema,
    },
  },
};

export type CommentResponse = JTDDataType<typeof commentResponseSchema>;

export type CommentsResponse = JTDDataType<typeof commentsResponseSchema>;

export type CommentCreate = {
  user_id: string;
  glyph_id: string;
  contents: string;
};
