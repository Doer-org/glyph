import { Txt } from "@/components/atoms/Txt";
import { TGlyph } from "@/types/Glyph";
import { FC } from "react";
import { format } from "date-fns";
import { FcDocument } from "react-icons/fc";
type TProps = {
	glyph: TGlyph;
};

export const Glyph: FC<TProps> = ({ glyph }) => {
	return (
		<div className="border border-black rounded-md m-2 w-2/3 flex justify-center">
			<div className="border-r">
				<FcDocument size={200} />
			</div>
			<div className="p-5">
				<Txt elm="h2" size="text-2xl">
					{glyph.title}
				</Txt>
				<p>{format(glyph.updated_at, "yyyy/MM/dd")}</p>
			</div>
		</div>
	);
};
