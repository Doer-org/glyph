import { TGlyph } from "@/types/Glyph";
import { FC } from "react";
import { Glyph } from "./glyph";
type TProps = {
	glyphs: TGlyph[];
};
export const Glyphs: FC<TProps> = ({ glyphs }) => {
	return (
		<div className="grid grid-cols-1 place-items-center break-words">
			{glyphs.data.map((glyph: TGlyph) => {
				return <Glyph glyph={glyph} key={glyph.id} />;
			})}
		</div>
	);
};
