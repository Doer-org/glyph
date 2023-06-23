'use client'
import { useEffect, useState } from 'react'

import { readGlyph } from '@/api'
import { TComment } from '@/types/Comment'
import { PopLinkTo } from '@/ui/LinkTo/components/popLinkTo'

type UserCommentsProps = {
  comments: TComment[]
}

export const UserComments = ({ comments }: UserCommentsProps) => {
  const [id2GlyphTitle, setId2GlyphTitle] = useState<Record<string, string>>({})
  useEffect(() => {
    const r = (async () => {
      const glyphIds = new Set(comments.map((comment) => comment.glyph_id))
      const glyphs = await Promise.all(Array.from(glyphIds).map((glyphId) => readGlyph(glyphId)))
      return glyphs
        .flatMap((g) => (g.type === 'error' ? [] : g.value.data))
        .map<[string, string]>((g) => [g.id, g.title])
        .reduce<Record<string, string>>((acc, [id, title]) => ({ ...acc, [id]: title }), {})
    })()
    r.then(setId2GlyphTitle)
  }, [comments])

  return (
    <div className="flex flex-col gap-5">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {comments.map((comment: TComment) => (
          <PopLinkTo href={`/glyphs/${comment.glyph_id}`} className="block w-full" key={comment.id}>
            <h2 className="text-2xl font-bold">{comment.contents}</h2>
            <p className="mt-auto mb-0"> - {comment.glyph_id in id2GlyphTitle && id2GlyphTitle[comment.glyph_id]}</p>
          </PopLinkTo>
        ))}
      </div>
    </div>
  )
}
