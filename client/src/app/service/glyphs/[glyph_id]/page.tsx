import { Txt } from "@/components/atoms/Txt";
import { GlyphDetail } from "@/components/organisms/glyphs/glyphDetail";
import { TGlyph } from "@/types/Glyph";

export default function Glyph() {
	const GlyphMock: TGlyph = {
		id: "1",
		author_id: "uu",
		title: "F#勉強会",
		content: "## aaa  \n- ggg",
		prev_glyph: "1",
		next_glyph: "2",
		status: "Draft",
		created_at: new Date(),
		updated_at: new Date(),
	};

	return (
		<>
			<Txt elm="h2" size="text-3xl" className="text-center pb-10">
				{GlyphMock.title}
			</Txt>
			<GlyphDetail glyph={GlyphMock} />
		</>
	);
}
