import { JTDDataType } from 'ajv/dist/core';

const glyphStatus = ['Draft', 'Private', 'Public'] as const;

const glyphSchema = {
  properties: {
    author_id: { type: 'string' },
    id: { type: 'string' },
    title: { type: 'string' },
    content: { type: 'string' },
    status: { enum: glyphStatus },
    prev_glyph: { type: 'string' },
    next_glyph: { type: 'string' },
    created_at: { type: 'string' },
    updated_at: { type: 'string' },
  },
} as const;

const glyphCreateSchema = {
  properties: {
    author_id: { type: 'string' },
    title: { type: 'string' },
    content: { type: 'string' },
    status: { enum: glyphStatus },
    prev_glyph: { type: 'string' },
    next_glyph: { type: 'string' },
  },
} as const;

const glyphReadSchema = {
  properties: {
    id: { type: 'string' },
  },
} as const;

const glyphEditSchema = {
  properties: {
    id: { type: 'string' },
    title: { type: 'string' },
    content: { type: 'string' },
    status: { enum: glyphStatus },
    prev_glyph: { type: 'string' },
    next_glyph: { type: 'string' },
  },
} as const;

const glyphDeleteSchema = {
  properties: {
    id: { type: 'string' },
  },
} as const;

export type Glyph = JTDDataType<typeof glyphSchema>;

export type GlyphCreate = JTDDataType<typeof glyphCreateSchema>;

export type GlyphRead = JTDDataType<typeof glyphReadSchema>;

export type GlyphReadRelativeAll = JTDDataType<typeof glyphReadSchema>;

export type GlyphEdit = JTDDataType<typeof glyphEditSchema>;

export type GlyphDelete = JTDDataType<typeof glyphDeleteSchema>;
