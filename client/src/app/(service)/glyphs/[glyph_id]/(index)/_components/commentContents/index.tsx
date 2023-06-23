import Image from 'next/image'
import { FC } from 'react'

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
          <div key={`${comment.id}-${index}`} className="grid grid-cols-1 my-5 gap-2">
            <div className="w-7 h-7">
              {comment.user && comment.user.img && (
                <Image src={comment.user.img} alt="avatar" width={28} height={28} className="rounded-full " />
              )}
            </div>
            <p className="border-2 p-2 rounded-md col-span-4">{comment.contents}</p>
          </div>
        )
      })}
    </>
  )
}
