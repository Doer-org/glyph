import { TGlyph } from "@/types/Glyph";
import { FC } from "react";

type TProps = {
	glyph: TGlyph;
};

export const Glyph: FC<TProps> = ({ glyph }) => {
	return <div>Glyph一つ分</div>;
};
