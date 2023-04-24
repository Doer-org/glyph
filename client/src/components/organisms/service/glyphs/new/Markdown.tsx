"use client";

import { useState } from "react";
import ReactMarkdown from "react-markdown";
import { CodeBlock } from "./CodeBlock";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import {
	handleImageDrop,
	handleMarkdownChange,
	options,
} from "./MarkdownUtils";

// dynamicでimportする際にアロー関数で定義すると読み込めなくなるのでここのみexport default
export default function Markdown() {
	const [markdown, setMarkdown] = useState<string>("");

	return (
		<>
			<SimpleMDE
				id="simple-mde"
				value={markdown}
				onChange={(value) => handleMarkdownChange(value, setMarkdown)}
				options={options}
				events={{ drop: handleImageDrop }}
			/>
			<div className="p-2 border-2  w-full">
				<ReactMarkdown className="prose lg:prose-md" components={CodeBlock}>
					{markdown}
				</ReactMarkdown>
			</div>
		</>
	);
}
