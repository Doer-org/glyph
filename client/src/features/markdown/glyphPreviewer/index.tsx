'use client'
import { FC } from 'react'
import ReactMarkdown from 'react-markdown'

import { CodeBlock } from '../CodeBlock'
type TProps = {
  markdown: string
}

export const GlyphPreviewer: FC<TProps> = ({ markdown }) => {
  return (
    <div className="p-2 border-2  w-full rounded-md">
      <ReactMarkdown className="prose lg:prose-md" components={CodeBlock}>
        {markdown}
      </ReactMarkdown>
    </div>
  )
}
