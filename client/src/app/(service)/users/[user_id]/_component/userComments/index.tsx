'use client'
import { FC } from 'react'

import { PopLinkTo } from '@/ui/LinkTo/components/popLinkTo'

interface Comment {
  id: string
  glyph_id: string
  glyph_title: string
  content: string
  created_at: Date
}

type UserCommentsProps = {
  id: string
}

export const UserComments: FC<UserCommentsProps> = () => {
  // const [comments, setComments] = useState<Comment[] | null>(null);
  const comment = [
    {
      id: '1',
      glyph_id: '1',
      glyph_title: 'test',
      content: 'test',
      created_at: new Date(),
    },
    {
      id: '1',
      glyph_id: '1',
      glyph_title: 'test',
      content: 'test',
      created_at: new Date(),
    },
  ]
  return (
    <div className="flex flex-col gap-5">
      <h2 className="text-2xl font-bold pb-5">Comments一覧</h2>
      <div className=" flex flex-col gap-5">
        {comment?.map((comment: Comment, index: number) => (
          <PopLinkTo href={`glyphs/${comment.glyph_id}`} className="block md:w-2/3 w-full" key={comment.id}>
            <h2 className="text-2xl font-bold">{comment.content}</h2>
            <p className="mt-auto mb-0"> - {comment.glyph_title}</p>
          </PopLinkTo>
        ))}
      </div>
    </div>
  )
}
