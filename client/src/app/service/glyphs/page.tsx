import { Txt } from "@/components/atoms/Txt";
import { Glyphs } from "@/components/organisms/glyphs";
import { TGlyph } from "@/types/Glyph";
import { NextPage } from "next";

const GlyphsPage: NextPage = () => {
	const glyphsMock: TGlyph[] = [
		{
			id: "1",
			author_id: "uu",
			title: "F#勉強会",
			content: "## aaa  ggg",
			prev_glyph: "1",
			next_glyph: "2",
			status: "Draft",
			created_at: new Date(),
			updated_at: new Date(),
		},
		{
			id: "2",
			author_id: "ee",
			title: "React勉強会",
			content: "## bbb eee",
			prev_glyph: "2",
			next_glyph: "4",
			status: "Draft",
			created_at: new Date(),
			updated_at: new Date(),
		},
	];

	return (
		<>
			<Txt elm="h2" size="text-3xl" className="text-center pb-10">
				Glyph一覧
			</Txt>
			<Glyphs glyphs={glyphsMock} />
		</>
	);
};
export default GlyphsPage;
