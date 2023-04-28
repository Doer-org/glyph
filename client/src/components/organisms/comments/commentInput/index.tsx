'use client';
import { Button } from '@/components/atoms/Button';
import { Textarea } from '@/components/atoms/Textarea';
import { FC, useState } from 'react';
type TProps = {
  sendComment: (comment: string) => void;
};
export const CommentInput: FC<TProps> = ({ sendComment }) => {
  const [content, setContent] = useState('');
  return (
    <div className="flex items-start my-3 gap-3">
      <Textarea
        content={content}
        changeContent={setContent}
        className="rounded-md w-3/4"
      />
      <Button
        onClick={() => {
          if (content.length !== 0) {
            sendComment(content);
            setContent('');
          }
        }}
      >
        投稿
      </Button>
    </div>
  );
};
