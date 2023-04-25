import { Glyph, GlyphCreate, apiClient } from './core';

export const createGlyph = async (glyph: GlyphCreate) => {
  return await apiClient.post<Glyph>(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/glyphs`,
    glyph
  );
};
