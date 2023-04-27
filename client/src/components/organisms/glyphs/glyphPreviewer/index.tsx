'use client';
import React, { FC } from 'react';
import ReactMarkdown from 'react-markdown';
import { CodeBlock } from '../../_common/markdown/CodeBlock';
type TProps = {
	markdown: string;
};

export const GlyphPreviewer: FC<TProps> = ({ markdown }) => {
	return (
		<div className="p-2 border-2  w-full rounded-md">
			<ReactMarkdown className="prose lg:prose-md" components={CodeBlock}>
				{markdown}
			</ReactMarkdown>
		</div>
	);
};
