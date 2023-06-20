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
  // const commentsAndUsers = await Promise.all(
  //     comments.value.data.map(async (comment) => {
  //       const user = await API.readUser(comment.user_id, token).catch((error) => {
  //         throw new Error('era-')
  //       })
  //       return { ...comment, user: (user.type === 'ok' && user.value.data) || undefined }
  //     })
  if (comments.length === 0) return <p>コメントはありません</p>
  return (
    <div>
      {comments?.map((comment, index) => {
        return (
          <div key={`${comment.id}-${index}`}>
            <p className="border-2 p-2 rounded-md my-2">{comment.contents}</p>
          </div>
        )
      })}
    </div>
  )
}
