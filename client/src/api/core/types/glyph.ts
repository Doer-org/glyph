import { JTDDataType } from 'ajv/dist/core';

const glyphSchema = {
  properties: {
    author_id: { type: 'string' },
    id: { type: 'string' },
    title: { type: 'string' },
    content: { type: 'string' },
    prev_glyph: { type: 'string' },
    next_glyph: { type: 'string' },
    created_at: { type: 'string' },
    updated_at: { type: 'string' },
  },
} as const;

export type Glyph = JTDDataType<typeof glyphSchema>;

const glyphCreateSchema = {
  properties: {
    author_id: { type: 'string' },
    title: { type: 'string' },
    content: { type: 'string' },
    prev_glyph: { type: 'string' },
    next_glyph: { type: 'string' },
    created_at: { type: 'string' },
    updated_at: { type: 'string' },
  },
} as const;

export type GlyphCreate = JTDDataType<typeof glyphCreateSchema>;
