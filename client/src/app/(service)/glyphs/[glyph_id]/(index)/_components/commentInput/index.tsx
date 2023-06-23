'use client'
import { FC, useEffect, useRef, useState } from 'react'
import { IoMdSend } from 'react-icons/io'

import { IconButton } from '../../../../../../../ui/Button/components/iconButton'
import { Textarea } from '../../../../../../../ui/Textarea'

type TProps = { sendComment: (comment: string) => void }

export const CommentInput: FC<TProps> = ({ sendComment }) => {
  const [content, setContent] = useState('')
  const [height, setHeight] = useState(1)
  const textAreaRef = useRef(null)
  const invisibleRef = useRef(null)
  useEffect(() => {
    if (textAreaRef.current) {
      setHeight(0)
    }
  }, [content])
  useEffect(() => {
    if (!height && textAreaRef.current) {
      setHeight(height + 1)
    }
  }, [height])

  return (
    <div className="mt-5 flex bg-white rounded-md shadow-lg px-3 py-[10px]">
      <Textarea
        ref={textAreaRef}
        content={content}
        changeContent={setContent}
        className="w-full h-[30px] border-none resize-none align-middle outline-none overflow-hidden"
      />
      <Textarea
        ref={invisibleRef}
        content={content}
        changeContent={() => {}}
        tabIndex={-1}
        className="invisible hidden"
      />
      <div className="flex justify-center">
        <IconButton
          className="absolute border-none w-7 h-7 right-6"
          disable={content.length === 0}
          border={false}
          onClick={() => {
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
