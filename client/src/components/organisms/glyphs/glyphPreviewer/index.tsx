import React, { FC } from "react";
import ReactMarkdown from "react-markdown";
import { CodeBlock } from "../../_common/markdown/CodeBlock";
type TProps = {
	markdown: string;
};

export const GlyphPreviewer: FC<TProps> = ({ markdown }) => {
	return (
		<ReactMarkdown className="prose lg:prose-md" components={CodeBlock}>
			{markdown}
		</ReactMarkdown>
	);
};
