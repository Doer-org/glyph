'use client';
import { FC } from 'react';
import SimpleMDE from 'react-simplemde-editor';
import 'easymde/dist/easymde.min.css';
import {
  handleImageDrop,
  handleMarkdownChange,
  options,
} from '../../_common/markdown/MarkdownUtils';

type TProps = {
  markdown: string;
  setMarkdown: (markdown: string) => void;
};

export const GlyphEditor: FC<TProps> = ({ markdown, setMarkdown }) => {
  return (
    <SimpleMDE
      id="simple-mde"
      className="rounded-md"
      value={markdown}
      onChange={(value) => handleMarkdownChange(value, setMarkdown)}
      options={options}
      events={{ drop: handleImageDrop }}
    />
  );
};
