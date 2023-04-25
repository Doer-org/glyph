import { TGlyph } from "@/types/Glyph";
import { FC } from "react";
import { Glyph } from "./glyph";
type TProps = {
	glyphs: TGlyph[];
};
export const Glyphs: FC<TProps> = ({ glyphs }) => {
	return (
		<div>
			<p>glyphの配列を受け取ってそれらをここでmapで回します</p>
			{glyphs.map((glyph: TGlyph) => {
				return <Glyph glyph={glyph} key={glyph.id} />;
			})}
		</div>
	);
};
