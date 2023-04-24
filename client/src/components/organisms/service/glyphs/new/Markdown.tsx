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
import { useToggle } from "@/hooks/common/useToggle";
import Toggle from "@/components/atoms/Toggle";

// dynamicでimportする際にアロー関数で定義すると読み込めなくなるのでここのみexport default
export default function Markdown() {
	const [markdown, setMarkdown] = useState<string>("");
	const { bool: isPreview, toggle: togglePreview } = useToggle();
	const { bool: isPublic, toggle: togglePublic } = useToggle();

	return (
		<>
			<div className="text-center mb-1 flex gap-5 justify-end">
				<div>
					<p>切り替え</p>
					<Toggle bool={isPreview} toggle={togglePreview} />
				</div>
				<div>
					<p>外部に公開</p>
					<Toggle bool={isPublic} toggle={togglePublic} />
				</div>
			</div>
			{isPreview ? (
				<div className="p-2 border-2  w-full rounded-md">
					<ReactMarkdown className="prose lg:prose-md" components={CodeBlock}>
						{markdown}
					</ReactMarkdown>
				</div>
			) : (
				<SimpleMDE
					id="simple-mde"
					className="rounded-md"
					value={markdown}
					onChange={(value) => handleMarkdownChange(value, setMarkdown)}
					options={options}
					events={{ drop: handleImageDrop }}
				/>
			)}
		</>
	);
}
