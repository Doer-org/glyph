import { Txt } from "@/components/atoms/Txt";
import { TGlyph } from "@/types/Glyph";
import { FC } from "react";

type TProps = {
	glyph: TGlyph;
};

export const Glyph: FC<TProps> = ({ glyph }) => {
	const changeData = (date: Date) => {
		const year = date.getFullYear();
		const month = ("0" + (date.getMonth() + 1)).slice(-2);
		const day = ("0" + date.getDate()).slice(-2);
		return `${year}-${month}-${day}`;
	};
	return (
		<div className="border border-black rounded-md m-2 w-2/3 flex justify-center">
			<div className="border-r p-10 border-black">doc</div>
			<div className="p-5">
				<Txt elm="h2" size="text-2xl">
					{glyph.title}
				</Txt>
				<p>{changeData(glyph.updated_at)}</p>
				<p>{glyph.content}</p>
				<p>{glyph.author_id}</p>
			</div>
		</div>
	);
};
