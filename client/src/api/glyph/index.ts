import { getEnv } from '@/utils'

import { apiClient } from '../core'

import { GlyphCreate, GlyphEdit, GlyphResponse, GlyphsResponse } from './types'

const { serverURL } = getEnv()
export const createGlyph = async (glyph: GlyphCreate) =>
  await apiClient.post<GlyphResponse>(`${serverURL}/glyphs/`, glyph)

export const readGlyph = async (glyph_id: string) =>
  await apiClient.get<GlyphResponse>(`${serverURL}/glyphs/${glyph_id}`)

export const readAllGlyphs = async () => await apiClient.get<GlyphsResponse>(`${serverURL}/glyphs/list`)

export const readRelativeAllGlyphs = async (glyph_id: string) =>
  await apiClient.get<GlyphsResponse>(`${serverURL}/glyphs/list/${glyph_id}`)

export const editGlyph = async (glyph: GlyphEdit) =>
  await apiClient.put<GlyphResponse>(`${serverURL}/glyphs/${glyph.id}`, glyph)

export const deleteGlyph = async (glyph_id: string, token?: string) =>
  await apiClient.delete<GlyphsResponse>(`${serverURL}/glyphs/${glyph_id}`, undefined, token)

export const getGlyphsByAuthor = async (author_id: string) =>
  await apiClient.get<GlyphsResponse>(`${serverURL}/glyphs/user/${author_id}`)
