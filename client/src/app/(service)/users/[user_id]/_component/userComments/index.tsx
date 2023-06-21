'use client'
import { FC, useState } from 'react'

import { readGlyph } from '@/api'
import { TComment } from '@/types/Comment'
import { PopLinkTo } from '@/ui/LinkTo/components/popLinkTo'

type UserCommentsProps = {
  comments: TComment[] | null
}

export const UserComments: FC<UserCommentsProps> = ({ comments }) => {
  const [glyphTitles, setGlyphTitles] = useState<String[] | null>(null)
  comments?.map(async (comment: TComment) => {
    const glyphTitleResp = await readGlyph(comment.glyph_id)
    if (glyphTitleResp.type === 'error') return
    const glyphTitle = glyphTitleResp.value.data.title
    const new_glyphTitle = glyphTitles ? [...glyphTitles, glyphTitle] : [glyphTitle]
    setGlyphTitles(new_glyphTitle)
  })
  return (
    <div className="flex flex-col gap-5">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {comments ? (
          comments.map((comment: TComment, index: number) => (
            <PopLinkTo href={`/glyphs/${comment.glyph_id}`} className="block w-full" key={comment.id}>
              <h2 className="text-2xl font-bold">{comment.contents}</h2>
              {glyphTitles && <p className="mt-auto mb-0"> - {glyphTitles[index]}</p>}
            </PopLinkTo>
          ))
        ) : (
          <p>まだコメントしていません</p>
        )}
      </div>
    </div>
  )
}
