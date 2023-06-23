'use client'
import { FC, useState } from 'react'
import { IoMdSend } from 'react-icons/io'

import { IconButton } from '@/ui/Button/components/iconButton'
import { Textarea } from '@/ui/Textarea'

type TProps = { sendComment: (comment: string) => void }

export const CommentInput: FC<TProps> = ({ sendComment }) => {
  const [content, setContent] = useState('')
  // const [height, setHeight] = useState(30)
  // const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
  //   if (e.key === 'Enter') {
  //     if (height < 60) {
  //       const new_height = height + 15
  //       setHeight(new_height)
  //     }
  //     console.log(height)
  //   }
  // }

  return (
    <div className="mt-5 flex bg-white rounded-md shadow-lg px-3 py-[10px] w-full">
      <Textarea
        content={content}
        changeContent={setContent}
        className={`w-full border-none resize-none align-middle outline-none hidden-scrollbar `}
      />
      <div className="flex justify-center">
        <IconButton
          className="border-none w-7 h-7 right-6"
          disable={content.length === 0}
          border={false}
          onClick={() => {
            if (content === '') return
            sendComment(content)
            setContent('')
          }}
        >
          <IoMdSend width={24} height={24} className="m-auto" />
        </IconButton>
      </div>
    </div>
  )
}
