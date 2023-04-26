import {
  Glyph,
  GlyphCreate,
  GlyphDelete,
  GlyphEdit,
  GlyphRead,
  apiClient,
} from './core';

export const createGlyph = async (glyph: GlyphCreate) =>
  await apiClient.post<Glyph>(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/glyphs/`,
    glyph
  );

export const readGlyph = async (glyph: GlyphRead) =>
  await apiClient.get<Glyph>(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/glyphs/${glyph.id}`
  );

export const readAllGlyphs = async () =>
  await apiClient.get<Glyph[]>(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/glyphs/list`
  );

export const readRelativeAllGlyphs = async (glyph: GlyphRead) =>
  await apiClient.get<Glyph[]>(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/glyphs/list/${glyph.id}`
  );

export const editGlyph = async (glyph: GlyphEdit) =>
  await apiClient.put<Glyph>(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/glyphs/`,
    glyph
  );

export const deleteGlyph = async (glyph: GlyphDelete) =>
  await apiClient.delete<Glyph>(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/glyphs/${glyph.id}`
  );
