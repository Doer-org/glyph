'use client';
import { FC, useEffect, useRef, useState } from 'react';
import { CommentBox } from '../commentBox';
import { CommentInput } from '../commentInput';
import { useWebSocketComments } from './hooks/useWebSocketComments';

type TProps = {
  glyphId: string;
  user: {
    user_id: string;
    user_name: string;
    user_img: string;
  };
};
export const WsComments: FC<TProps> = (props: TProps) => {
  const { sendComment, wsComments } = useWebSocketComments(
    props.glyphId,
    props.user,
  );

  return (
    <div className=" fixed">
      <CommentBox>
        {wsComments.map((comment, index) => {
          return (
            <div
              key={`${comment.data.comment}-${index}`}
              style={{
                display: 'flex',
                flexDirection: 'row',
                height: '4rem',
                alignItems: 'center',
                columnGap: '0.5rem',
              }}
            >
              <img src={comment.data.user_img} alt="image" className=" w-10" />
              <p className="border-2 p-2 rounded-md my-2 break-words">
                {comment.data.user_name}: {comment.data.comment}
              </p>
            </div>
          );
        })}
      </CommentBox>
      <CommentInput sendComment={sendComment} />
    </div>
  );
};
