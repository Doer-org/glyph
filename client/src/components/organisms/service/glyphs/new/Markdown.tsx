"use client";

import { FC, useState } from "react";
import ReactMarkdown from "react-markdown";
import { CodeBlock } from "./CodeBlock";
export const Markdown: FC = () => {
	const [markdown, setMarkdown] = useState<string>("");
	console.log("markdown!!");
	return (
		<div>
			<textarea
				onChange={(e) => setMarkdown(e.target.value)}
				className="border-2 p-2 w-full h-80"
				value={markdown}
			/>

			<div className="p-2 border-2  w-full">
				<ReactMarkdown
					unwrapDisallowed={false}
					className="prose lg:prose-md"
					components={CodeBlock}
				>
					{markdown}
				</ReactMarkdown>
			</div>
		</div>
	);
};
