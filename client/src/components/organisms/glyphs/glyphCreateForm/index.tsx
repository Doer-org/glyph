"use client";

import { useState } from "react";
import "easymde/dist/easymde.min.css";
import { useToggle } from "@/hooks/common/useToggle";
import { ToggleButton } from "@/components/atoms/Toggle";
import { Input } from "@/components/atoms/Input";
import { Button } from "@/components/atoms/Button";
import { GlyphPreviewer } from "../glyphPreviewer";
import { GlyphEditor } from "../glyphEditor";
import { createGlyph } from "@/api/glyph";

// dynamicでimportする際にアロー関数で定義すると読み込めなくなるのでここのみexport default
export default function GlyphCreateForm() {
	const [markdown, setMarkdown] = useState<string>("");
	const { bool: isPreview, toggle: togglePreview } = useToggle();
	const { bool: isPublic, toggle: togglePublic } = useToggle();
	const [title, setTitle] = useState<string>("");
	const createGlyphHandler = () =>
		createGlyph({
			author_id: "tekitou",
			title: title,
			content: markdown,
			status: "Public",
			isStudy: false,
			prev_glyph: "string",
			next_glyph: "string",
		});
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
						<ToggleButton bool={isPreview} toggle={togglePreview} />
					</div>
					<div>
						<p>外部に公開</p>
						<ToggleButton bool={isPublic} toggle={togglePublic} />
					</div>
					<div className="mx-5">
						<Button border onClick={createGlyphHandler}>
							保存
						</Button>
					</div>
					<Button border>下書き保存</Button>
				</div>
			</div>
			{isPreview ? (
				<GlyphPreviewer markdown={markdown} />
			) : (
				<GlyphEditor markdown={markdown} setMarkdown={setMarkdown} />
			)}
		</>
	);
}
