import { Txt } from "@/components/atoms/Txt";
import { TGlyph } from "@/types/Glyph";
import { FC } from "react";

type TProps = {
	glyph: TGlyph;
};

export const Glyph: FC<TProps> = ({ glyph }) => {
	return (
		<div className="border border-black rounded-md p-2 m-2">
			<Txt elm="h2" size="text-2xl">
				{glyph.title}
			</Txt>

			<p>{glyph.content}</p>
			<p>{glyph.author_id}</p>
		</div>
	);
};
