import { readGlyph } from "@/api/glyph";
import { Txt } from "@/components/atoms/Txt";
import dynamic from "next/dynamic";
const GlyphEditForm = dynamic(
	() => import("@/components/organisms/glyphs/glyphEditForm"),
	{ ssr: false },
);

export const metadata = {
	title: "Glyph edit",
};
type TProps = {
	params: { glyph_id: string };
	searchParams: { id: string };
};
const GlyphEditPage = async ({ params }: TProps) => {
	const glyph = await readGlyph(params.glyph_id);
	if (glyph.type === "error") {
		return <p>Glyphが取得できない</p>;
	}
	return (
		<>
			<Txt elm="h2" size="text-3xl" className="text-center pb-10">
				{glyph.value.data.title}(編集中)
			</Txt>
			<GlyphEditForm glyph={glyph.value.data} />
		</>
	);
};
export default GlyphEditPage;
