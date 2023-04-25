import { Txt } from "@/components/atoms/Txt";
import { NextPage } from "next";
import dynamic from "next/dynamic";
const Markdown = dynamic(
	() => import("@/components/organisms/service/glyphs/new/Markdown"),
	{ ssr: false },
);
const GlyphNewPage: NextPage = () => {
	return (
		<>
			<Txt elm="h2" size="text-3xl" className="text-center pb-10">
				Glyph作成
			</Txt>
			<Markdown />
		</>
	);
};
export default GlyphNewPage;
