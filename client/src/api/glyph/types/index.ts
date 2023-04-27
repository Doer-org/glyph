import { JTDDataType } from "ajv/dist/core";

const glyphStatus = ["Draft", "Private", "Public"] as const;

const glyphResponseSchema = {
	type: "object",
	properties: {
		data: {
			type: "object",
			properties: {
				author_id: { type: "string" },
				id: { type: "string" },
				title: { type: "string" },
				content: { type: "string" },
				status: { enum: glyphStatus },
				prev_glyph: { type: "string" },
				next_glyph: { type: "string" },
				isStudy: { type: "boolean" },
				created_at: { type: "string" },
				updated_at: { type: "string" },
			},
		},
	},
} as const;

export type GlyphResponse = JTDDataType<typeof glyphResponseSchema>;

type GlyphBase = {
	author_id: string;
	id: string;
	title: string;
	content: string;
	status: typeof glyphStatus[number];
	prev_glyph: string;
	next_glyph: string;
	isStudy: boolean;
	created_at: string;
	updated_at: string;
};

export type GlyphCreate = Omit<GlyphBase, "id" | "created_at" | "updated_at">;

export type GlyphEdit = Omit<
	GlyphBase,
	"author_id" | "created_at" | "updated_at"
>;

const glyphDeleteResponseSchema = {
	properties: {
		data: { type: "string" },
	},
} as const;

export type GlyphDeleteResponse = JTDDataType<typeof glyphDeleteResponseSchema>;
