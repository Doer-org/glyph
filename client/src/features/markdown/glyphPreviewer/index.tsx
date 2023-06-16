'use client'
import { FC } from 'react'
import ReactMarkdown from 'react-markdown'
import { CodeBlock } from '../CodeBlock'
type TProps = { markdown: string }

export const GlyphPreviewer: FC<TProps> = ({ markdown }) => {
  return (
    <div className="p-5 w-full rounded-sm shadow-[0px_2px_2px_2px_#3A3A3A]">
      <ReactMarkdown className="lg:prose-md" components={CodeBlock}>
        {markdown}
      </ReactMarkdown>
    </div>
  )
}
