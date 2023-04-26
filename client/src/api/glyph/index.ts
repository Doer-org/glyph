import { apiClient } from '../core';

import { GlyphResponse, GlyphCreate, GlyphEdit } from './types';

export const createGlyph = async (glyph: GlyphCreate) =>
  await apiClient.post<GlyphResponse>(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/glyphs/`,
    glyph
  );

export const readGlyph = async (glyph_id: string) =>
  await apiClient.get<GlyphResponse>(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/glyphs/${glyph_id}`
  );

export const readAllGlyphs = async () =>
  await apiClient.get<GlyphResponse[]>(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/glyphs/list`
  );

export const readRelativeAllGlyphs = async (glyph_id: string) =>
  await apiClient.get<GlyphResponse[]>(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/glyphs/list/${glyph_id}`
  );

export const editGlyph = async (glyph: GlyphEdit) =>
  await apiClient.put<GlyphResponse>(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/glyphs/`,
    glyph
  );

export const deleteGlyph = async (glyph_id: string) =>
  await apiClient.delete<any>(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/glyphs/${glyph_id}`
  );
