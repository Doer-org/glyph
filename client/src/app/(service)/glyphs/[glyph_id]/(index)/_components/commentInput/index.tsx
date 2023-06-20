'use client'
import { FC, useState } from 'react'

import { Button } from '@/ui/Button'
import { Textarea } from '@/ui/Textarea'

type TProps = { sendComment: (comment: string) => void }

export const CommentInput: FC<TProps> = ({ sendComment }) => {
  const [content, setContent] = useState('')
  return (
    <div className="mt-5 block">
      <Textarea content={content} changeContent={setContent} className="rounded-md shadow-lg w-full" />
      <div className="flex justify-center">
        <Button
          className="w-3/4 m-auto bg-white mt-3"
          disable={content.length === 0}
          onClick={() => {
            sendComment(content)
            setContent('')
          }}
        >
          投稿
        </Button>
      </div>
    </div>
  )
}
