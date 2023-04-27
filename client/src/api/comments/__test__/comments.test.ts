import { createUser } from '../../user';
import { getCommentsByGlyphId, getCommentsByUserID, postComment } from '../';

import { expect, test } from 'vitest';
import { createGlyph } from '../../glyph';

test('Comment: Create', async () => {
	const resp = await createUser({
		name: 'string',
		img: 'string',
	});
	if (resp.type === 'error') throw new Error('Create User failed');
	const resp2 = await postComment({
		user_id: resp.value.data.id,
		glyph_id: 'string',
		contents: 'string',
	});
	expect(resp2.type).toBe('ok');
});

test("Comment: Fetch Glyph's Comments", async () => {
	const resp = await createUser({
		name: 'string',
		img: 'string',
	});
	if (resp.type === 'error') throw new Error('Create User failed');
	const resp2 = await createGlyph({
		author_id: resp.value.data.id,
		title: 'string',
		content: 'string',
		status: 'Public',
		prev_glyph: 'string',
		next_glyph: 'string',
	});
	if (resp2.type === 'error') throw new Error('Create Glyph failed');
	const post = async () => {
		await postComment({
			user_id: resp.value.data.id,
			glyph_id: resp2.value.data.id,
			contents: 'string',
		});
	};
	const _ = await Promise.all([post(), post(), post()]);
	const resp3 = await getCommentsByGlyphId(resp2.value.data.id);
	expect(resp3.type).toBe('ok');
});

test("Comment: Fetch User's Comments", async () => {
	const resp = await createUser({
		name: 'string',
		img: 'string',
	});
	if (resp.type === 'error') throw new Error('Create User failed');
	const resp2 = await createGlyph({
		author_id: resp.value.data.id,
		title: 'string',
		content: 'string',
		status: 'Public',
		prev_glyph: 'string',
		next_glyph: 'string',
	});
	if (resp2.type === 'error') throw new Error('Create Glyph failed');
	const post = async (user_id: string) => {
		await postComment({
			user_id: user_id,
			glyph_id: resp2.value.data.id,
			contents: 'string',
		});
	};
	const _ = await Promise.all([
		post(resp.value.data.id),
		post(resp.value.data.id),
		post(`not_${resp.value.data.id}`),
	]);
	const resp3 = await getCommentsByUserID(resp.value.data.id);
	expect(resp3.type === 'ok').toBe(true);
});
