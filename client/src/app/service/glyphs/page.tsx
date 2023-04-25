import { Txt } from "@/components/atoms/Txt";
import { Glyphs } from "@/components/organisms/service/glyphs/index/Glyphs";
import { NextPage } from "next";

const GlyphsPage: NextPage = () => {
	return (
		<>
			<Txt elm="h2" size="text-3xl" className="text-center pb-10">
				Glyph一覧
			</Txt>
			<Glyphs />
		</>
	);
};
export default GlyphsPage;
