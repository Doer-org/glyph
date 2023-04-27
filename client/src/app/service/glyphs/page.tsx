import { readAllGlyphs } from "@/api/glyph";
import { StyledLinkTo } from "@/components/atoms/StyledLinkTo";
import { Txt } from "@/components/atoms/Txt";
import { Glyphs } from "@/components/organisms/glyphs";
import { TGlyph } from "@/types/Glyph";

const GlyphsPage = async () => {
	// 環境変数が読み込めてなくてURLのパースに失敗するよって感じでビルドこける
	const glyphs = await readAllGlyphs();
	if (glyphs.type === "error") {
		return new Error("Glyphを取得できませんでした");
	}
	console.log(glyphs.value.data);

	const glyphsMock: TGlyph[] = [
		{
			id: "1",
			author_id: "uu",
			title: "F#勉強会",
			content: "## aaa  ggg",
			prev_glyph: "1",
			next_glyph: "2",
			status: "Draft",
			isStudy: false,
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
			isStudy: false,
			created_at: new Date(),
			updated_at: new Date(),
		},
	];

	return (
		<>
			<Txt elm="h2" size="text-3xl" className="text-center pb-10">
				Glyph一覧
			</Txt>
			<div className="text-center mb-10">
				<StyledLinkTo href="/service/glyphs/new">Glyph作成</StyledLinkTo>
			</div>

			<Glyphs glyphs={glyphs.value} />
		</>
	);
};
export default GlyphsPage;
