import { Txt } from "@/components/atoms/Txt";
import { NextPage } from "next";
import dynamic from "next/dynamic";
const GlyphEditor = dynamic(
	() => import("@/components/organisms/glyphs/glyphEditor"),
	{ ssr: false },
);
const GlyphNewPage: NextPage = () => {
	return (
		<>
			<Txt elm="h2" size="text-3xl" className="text-center pb-10">
				Glyph作成
			</Txt>
			<GlyphEditor />
		</>
	);
};
export default GlyphNewPage;
