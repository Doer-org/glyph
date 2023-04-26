"use client";
import { TGlyph } from "@/types/Glyph";
import { FC } from "react";
import { GlyphPreviewer } from "../glyphPreviewer";
import { CommentBox } from "../../comments/commentBox";
import { CommentInput } from "../../comments/commentInput";

type TProps = {
	glyph: TGlyph;
};

export const GlyphDetail: FC<TProps> = ({ glyph }) => {
	// ここで常にcommentを取得してくる
	return (
		<div className="flex">
			<div className="w-2/3">
				<GlyphPreviewer markdown={glyph.content} />
			</div>
			<div className="w-1/3">
				<div className="ml-2">
					<CommentBox>
						<p className=" border-2 p-2 rounded-md">comment</p>
						<p className=" border-2 p-2 rounded-md">comment</p>
						<p className=" border-2 p-2 rounded-md">comment</p>
						<CommentInput />
					</CommentBox>
				</div>
			</div>
		</div>
	);
};
