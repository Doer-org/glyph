"use client";
import { Input } from "@/components/atoms/Input";
import { useState } from "react";

export const CommentInput = () => {
	const [comment, setComment] = useState("");
	return (
		<div className="absolute bottom-1">
			<div className="flex">
				<Input
					type="text"
					content={comment}
					changeContent={setComment}
					className="w-full border-black"
				/>
			</div>
		</div>
	);
};
