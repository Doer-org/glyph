import { GlyphDetail } from "@/components/organisms/glyphs/glyphDetail";
import { TGlyph } from "@/types/Glyph";

export default function Glyph() {
	const GlyphMock: TGlyph = {
		id: "1",
		author_id: "uu",
		title: "F#勉強会",
		content: "## aaa  ggg",
		prev_glyph: "1",
		next_glyph: "2",
		status: "Draft",
		created_at: new Date(),
		updated_at: new Date(),
	};

	return (
		<div>
			<GlyphDetail glyph={GlyphMock} />
		</div>
	);
}
