import { readAllGlyphs } from '@/api/glyph';
import { StyledLinkTo } from '@/components/atoms/StyledLinkTo';
import { Txt } from '@/components/atoms/Txt';
import { Glyphs } from '@/components/organisms/glyphs';

const GlyphsPage = async () => {
	// 環境変数が読み込めてなくてURLのパースに失敗するよって感じでビルドこける
	const glyphs = await readAllGlyphs();
	if (glyphs.type === 'error') {
		return new Error('Glyphを取得できませんでした');
	}

	return (
		<>
			<Txt elm="h2" size="text-3xl" className="text-center pb-10">
				Glyph一覧
			</Txt>
			<div className="text-center mb-10">
				<StyledLinkTo href="/service/glyphs/new">Glyph作成</StyledLinkTo>
			</div>

			<Glyphs glyphs={glyphs.value.data} />
		</>
	);
};
export default GlyphsPage;
