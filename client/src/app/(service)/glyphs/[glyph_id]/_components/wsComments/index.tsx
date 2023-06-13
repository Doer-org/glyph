"use client";
import { SvgLogo } from "@/components/atoms/svgs/SvgLogo";

import { CommentInput } from "@/components/organisms/comments/commentInput";
import { FC } from "react";
import { CommentBox } from "../commentBox";
import { useWebSocketComments } from "./hooks";

type TProps = {
	glyphId: string;
	user: {
		user_id: string;
		user_name: string;
		user_img: string;
	};
};
export const WsComments: FC<TProps> = (props: TProps) => {
	const { sendComment, wsComments } = useWebSocketComments(
		props.glyphId,
		props.user,
	);

	return (
		<div className=" fixed">
			<CommentBox>
				{wsComments.map((comment, index) => {
					return (
						<div
							key={`${comment.data.comment}-${index}`}
							style={{
								display: "flex",
								flexDirection: "row",
								height: "4rem",
								alignItems: "center",
								columnGap: "0.5rem",
							}}
						>
							<SvgLogo />
							<p className="border-2 p-2 rounded-md my-2 break-words">
								{comment.data.user_name}: {comment.data.comment}
							</p>
						</div>
					);
				})}
			</CommentBox>
			<CommentInput sendComment={sendComment} />
		</div>
	);
};
