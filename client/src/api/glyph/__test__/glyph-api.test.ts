import { createGlyph, deleteGlyph, editGlyph, readGlyph } from '../';
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
  expect(resp2.type === 'ok').toBe(true);
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
  expect(resp3.ok).toBe(true);
});
