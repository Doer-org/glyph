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
          <div key={`${comment.id}-${index}`}>
            <p className="border-2 p-2 rounded-md my-2">{comment.contents}</p>
          </div>
        )
      })}
    </>
  )
}
