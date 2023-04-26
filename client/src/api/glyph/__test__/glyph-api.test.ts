import { createGlyph, editGlyph, readGlyph } from '../../../api';
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
  console.log(resp.type === 'ok' && resp.value.data);
  expect(resp.type).toBe('ok');
});

// test('Glyph：Create => Read', async () => {
//   const resp = await createGlyph({
//     author_id: 'string',
//     title: 'string',
//     content: 'string',
//     status: 'Draft',
//     prev_glyph: 'string',
//     next_glyph: 'string',
//   });
//   if (resp.type === 'error') {
//     throw new Error('Create Glyph failed');
//   }
//   console.log(resp.value.id)
//   const resp2 = await readGlyph({ id: resp.value.id });
//   expect(resp2.type).toBe('ok');
// });

// test('Glyph：Create => Edit', async () => {
//   const resp = await createGlyph({
//     author_id: 'string',
//     title: 'string',
//     content: 'string',
//     status: 'Draft',
//     prev_glyph: 'string',
//     next_glyph: 'string',
//   });
//   if (resp.type === 'error') {
//     throw new Error('Create Glyph failed');
//   }
//   const resp2 = await editGlyph({
//     id: resp.value.id,
//     title: 'new title',
//     content: 'content',
//     status: 'Draft',
//     prev_glyph: 'string',
//     next_glyph: 'string',
//   });
//   expect(resp2.type === 'ok' && resp2.value.content === 'new title').toBe(true);
// });
