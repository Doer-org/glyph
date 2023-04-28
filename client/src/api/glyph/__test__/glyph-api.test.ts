import { createUser } from '../../user';
import {
  createGlyph,
  deleteGlyph,
  editGlyph,
  getGlyphsByAuthor,
  readGlyph,
  readAllGlyphs,
} from '../';
import { expect, test } from 'vitest';

test('Glyph：Create', async () => {
  const resp = await createGlyph({
    author_id: 'string',
    title: 'string',
    content: 'string',
    status: 'Draft',
    prev_glyph: 'string',
    next_glyph: 'string',
  });
  expect(resp.type).toBe('ok');
});

test('Glyph：Create => Read', async () => {
  const resp = await createGlyph({
    author_id: 'string',
    title: 'string',
    content: 'string',
    status: 'Draft',
    prev_glyph: 'string',
    next_glyph: 'string',
  });
  if (resp.type === 'error') throw new Error('Create Glyph failed');
  const resp2 = await readGlyph(resp.value.data.id);
  expect(resp2.type).toBe('ok');
});

test('Glyph：Create => ReadAll', async () => {
  const create = async (title: string) => {
    await createGlyph({
      author_id: 'string',
      title: title,
      content: 'string',
      status: 'Draft',
      prev_glyph: 'string',
      next_glyph: 'string',
    });
  };
  const _ = await Promise.all([
    create('title1'),
    create('title2'),
    create('title3'),
  ]);
  const resp = await readAllGlyphs();
  if (resp.type === 'ok') console.log(resp.value.data);
  expect(resp.type).toBe('ok');
});

test('Glyph：Create => Edit', async () => {
  const resp = await createGlyph({
    author_id: 'string',
    title: 'string',
    content: 'string',
    status: 'Draft',
    prev_glyph: 'string',
    next_glyph: 'string',
  });
  if (resp.type === 'error') throw new Error('Create Glyph failed');
  const resp2 = await editGlyph({
    id: resp.value.data.id,
    title: 'new title',
    content: 'content',
    status: 'Draft',
    prev_glyph: 'string',
    next_glyph: 'string',
  });
  expect(resp2.type).toBe('ok');
});

test('Glyph：Create => Read => Delete', async () => {
  const resp = await createGlyph({
    author_id: 'string',
    title: 'string',
    content: 'string',
    status: 'Draft',
    prev_glyph: 'string',
    next_glyph: 'string',
  });
  if (resp.type === 'error') throw new Error('Create Glyph failed');
  const resp2 = await readGlyph(resp.value.data.id);
  if (resp2.type === 'error') throw new Error('Read Glyph failed');
  const resp3 = await deleteGlyph(resp2.value.data.id);
  expect(resp3.type).toBe('ok');
});

test('Glyph: CreateUser => CreateGlyphs => GetGlyphs', async () => {
  const resp = await createUser({
    name: 'string',
    img: 'string',
  });
  if (resp.type === 'error') throw new Error('Create User failed');

  const create = async () =>
    await createGlyph({
      author_id: resp.value.data.id,
      title: 'string',
      content: 'string',
      status: 'Draft',
      prev_glyph: 'string',
      next_glyph: 'string',
    });
  const _ = await Promise.all([create(), create(), create()]);
  const resp3 = await getGlyphsByAuthor(resp.value.data.id);
  expect(resp3.type).toBe('ok');
});
