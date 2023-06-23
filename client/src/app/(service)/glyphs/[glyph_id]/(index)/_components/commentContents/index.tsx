import Image from 'next/image'
import { FC } from 'react'

import { LinkTo } from '@/ui/LinkTo'

type Comment = {
  id: string
  user_id: string
  glyph_id: string
  contents: string
  created_at: string
  user?: {
    id: string
    name: string
    img?: string
  }
}

type TProps = {
  comments: Comment[]
}

export const CommentContents: FC<TProps> = ({ comments }) => {
  if (comments.length === 0) return <p>コメントはありません</p>
  return (
    <>
      {comments?.map((comment, index) => {
        return (
          <div key={`${comment.id}-${index}`} className="flex gap-3">
            <div className="w-7 h-7 my-auto">
              {comment.user && comment.user.img && (
                <LinkTo href={`/users/${comment.user.id}`}>
                  <Image src={comment.user.img} alt="avatar" width={28} height={28} className="rounded-full " />
                </LinkTo>
              )}
            </div>
            <p className="border-2 p-2 rounded-md my-2">{comment.contents}</p>
          </div>
        )
      })}
    </>
  )
}
