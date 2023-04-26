"use client";
import { TGlyph } from "@/types/Glyph";
import { FC } from "react";
import { GlyphPreviewer } from "../glyphPreviewer";

type TProps = {
	glyph: TGlyph;
};

export const GlyphDetail: FC<TProps> = ({ glyph }) => {
	return (
		<>
			<GlyphPreviewer markdown={glyph.content} />
		</>
	);
};
