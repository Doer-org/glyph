"use client";
import * as API from "@/api";

import { FC, useEffect, useRef, useState } from "react";
import { CommentBox } from "../commentBox";
import { CommentInput } from "../commentInput";

type Comment = {
	id: string;
	author_id: string;
	glyph_id: string;
	contents: string;
	created_at: string;
	user?: {
		id: string;
		name: string;
		img?: string;
	};
};

type TProps = {
	glyphId: string;
	user_id: string;
	token?: string;
};

export const Comments: FC<TProps> = (props: TProps) => {
	const [comments, setComments] = useState<Comment[]>([]);
	useEffect(() => {
		(async () => {
			const comments = await API.getCommentsByGlyphId(props.glyphId);
			if (comments.type === "error") return;

			if (!comments.value.data) {
				setComments([]);
				return;
			}
			const commentsAndUsers = await Promise.all(
				comments.value.data.map(async (comment) => {
					const user = await API.readUser(comment.author_id, props.token);
					return {
						...comment,
						user: (user.type === "ok" && user.value.data) || undefined,
					};
				}),
			);
			setComments(commentsAndUsers);
		})();
	}, []);

	const scrollLastCommentRef = useRef<HTMLParagraphElement>(null);
	useEffect(() => {
		scrollLastCommentRef?.current?.scrollIntoView();
	}, [comments]);
	return (
		<>
			<CommentBox>
				{comments.map((comment, index) => {
					return (
						<div key={`${comment}-${index}`}>
							<p
								className="border-2 p-2 rounded-md my-2 break-words"
								ref={
									index === comments.length - 1
										? scrollLastCommentRef
										: undefined
								}
							>
								{comment.contents}
							</p>
						</div>
					);
				})}
			</CommentBox>
			<CommentInput
				sendComment={(comment) =>
					API.postComment({
						user_id: props.user_id,
						glyph_id: props.glyphId,
						contents: comment,
					})
				}
			/>
		</>
	);
};
