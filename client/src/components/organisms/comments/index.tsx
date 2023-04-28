'use client';
import { FC, useEffect, useRef, useState } from 'react';
import { CommentBox } from './commentBox';
import { CommentInput } from './commentInput';
type TProps = {
  glyphId: string;
};
export const Comments: FC<TProps> = ({ glyphId }) => {
  // TODO(aoki): glyphIdをもとにcommentをとってくる（静的）
  // メモ：こっちはwebsocketを使わない方
  // TODO(aoki): commentを取得してくる
  const [comments, setComments] = useState<string[]>([
    '普通のコメント1',
    '普通のコメント2',
  ]);
  const scrollLastCommentRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    scrollLastCommentRef?.current?.scrollIntoView();
  }, [comments]);
  return (
    <>
      <CommentBox>
        {comments.map((comment, index) => {
          return (
            <div key={`${comment}-${index}`}>
              <p
                className="border-2 p-2 rounded-md my-2 break-words"
                ref={
                  index === comments.length - 1
                    ? scrollLastCommentRef
                    : undefined
                }
              >
                {comment}
              </p>
            </div>
          );
        })}
      </CommentBox>
      <CommentInput comment={comments} setComment={setComments} />
    </>
  );
};
