type TGlyphStatus = "Draft" | "Private" | "Public";
export type TGlyph = {
	id: string;
	author_id: string;
	title: string;
	content: string;
	prev_glyph: string;
	next_glyph: string;
	status: TGlyphStatus;
	is_study: boolean;
	created_at: string;
	updated_at: string;
};
