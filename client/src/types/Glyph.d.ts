type TGlyphStatus = "Draft" | "Private" | "Public";
export type TGlyph = {
	id: string;
	author_id: string;
	title: string;
	content: string;
	prev_glyph: string;
	next_glyph: string;
	status: TGlyphStatus;
	isStudy: boolean;
	created_at: Date;
	updated_at: Date;
};
