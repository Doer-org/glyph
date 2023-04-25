"use client";

import { useState } from "react";
import ReactMarkdown from "react-markdown";
import { CodeBlock } from "../../_common/markdown/CodeBlock";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import {
	handleImageDrop,
	handleMarkdownChange,
	options,
} from "../../_common/markdown/MarkdownUtils";
import { useToggle } from "@/hooks/common/useToggle";
import Toggle from "@/components/atoms/Toggle";
import { Input } from "@/components/atoms/Input";
import { Button } from "@/components/atoms/Button";

// dynamicでimportする際にアロー関数で定義すると読み込めなくなるのでここのみexport default
export default function GlyphEditor() {
	const [markdown, setMarkdown] = useState<string>("");
	const { bool: isPreview, toggle: togglePreview } = useToggle();
	const { bool: isPublic, toggle: togglePublic } = useToggle();
	const [title, setTitle] = useState<string>("");

	return (
		<>
			<div className="text-center mb-1 lg:flex items-end lg:justify-between justify-center py-3">
				<div className="ms-3">
					<Input
						type="text"
						label="タイトル："
						content={title}
						changeContent={setTitle}
					/>
				</div>

				<div className="flex gap-3 items-end justify-center">
					<div>
						<p>切り替え</p>
						<Toggle bool={isPreview} toggle={togglePreview} />
					</div>
					<div>
						<p>外部に公開</p>
						<Toggle bool={isPublic} toggle={togglePublic} />
					</div>
					<div className="mx-5">
						<Button border>保存</Button>
					</div>
					<Button border>下書き保存</Button>
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
