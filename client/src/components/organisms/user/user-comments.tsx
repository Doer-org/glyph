"use client";
import { LinkTo } from "@/components/atoms/LinkTo";
import { format } from "date-fns";
import React, { FC, useState } from "react";

interface Comment {
  id: string;
  glyph_id: string;
  glyph_title: string;
  content: string;
  created_at: Date;
}

type UserCommentsProps = {
  id: string;
};

export const UserComments: FC<UserCommentsProps> = () => {
  // const [comments, setComments] = useState<Comment[] | null>(null);
  const comments = [
    {
      id: "1",
      glyph_id: "1",
      glyph_title: "test",
      content: "test",
      created_at: new Date(),
    },
  ];
  return (
    <div>
      <div className="text-2xl">Comments一覧</div>
      {comments?.map((comment: Comment, index: number) => (
        <div key={index} className="my-4">
          <LinkTo href={`service/glyphs/${comment.glyph_id}`}>
            <div>
              <div>{comment.glyph_title}</div>
              <div className="text-xl">- {comment.content}</div>
            </div>
          </LinkTo>
        </div>
      ))}
    </div>
  );
};
