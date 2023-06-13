'use client'

import { createGlyph } from '@/api/glyph'
import { GlyphEditor } from '@/features/markdown/glyphEditor'
import { GlyphPreviewer } from '@/features/markdown/glyphPreviewer'
import { useToggle } from '@/hooks/common/useToggle'
import { TGlyph } from '@/types/Glyph'
import { Button } from '@/ui/Button'
import { Input } from '@/ui/Input'
import { ToggleButton } from '@/ui/Toggle'
import 'easymde/dist/easymde.min.css'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

// dynamicでimportする際にアロー関数で定義すると読み込めなくなるのでここのみexport default
export default function GlyphCreateForm() {
  const router = useRouter()
  const [markdown, setMarkdown] = useState<string>('')
  const { bool: isPreview, toggle: togglePreview } = useToggle()
  const { bool: isPublic, toggle: togglePublic, toFalse: notPublic } = useToggle()
  const { bool: isDraft, toggle: toggleDraft, toFalse: notDraft } = useToggle()
  const { bool: isStudy, toggle: toggleStudy } = useToggle()
  const [title, setTitle] = useState<string>('')
  const statusDefineder = (): TGlyph['status'] => {
    if (isPublic && isDraft) {
      return 'Draft'
    }
    if (isPublic && !isDraft) {
      return 'Public'
    }
    if (!isPublic && isDraft) {
      return 'Draft'
    }
    if (isPublic && !isDraft) {
      return 'Private'
    }
    return 'Draft'
  }
  const createGlyphHandler = () => {
    createGlyph({
      author_id: 'tekitou',
      title: title,
      content: markdown,
      status: statusDefineder(),
      is_study: isStudy,
      prev_glyph: 'string',
      next_glyph: 'string',
    })
    router.push('/service/glyphs')
  }
  return (
    <>
      <div className="text-center mb-1 lg:flex items-end lg:justify-between justify-center py-3">
        <div className="ms-3">
          <Input type="text" label="タイトル：" content={title} changeContent={setTitle} />
        </div>

        <div className="flex gap-3 items-end justify-center">
          <div>
            <p>切り替え</p>
            <ToggleButton bool={isPreview} toggle={togglePreview} />
          </div>
          <div>
            <p>外部に公開</p>
            <ToggleButton
              bool={isPublic}
              toggle={() => {
                togglePublic()
                if (isDraft) {
                  notDraft()
                }
              }}
            />
          </div>
          <div>
            <p>下書き</p>
            <ToggleButton
              bool={isDraft}
              toggle={() => {
                toggleDraft()
                if (isPublic) {
                  notPublic()
                }
              }}
            />
          </div>
          <div>
            <p>勉強会中</p>
            <ToggleButton bool={isStudy} toggle={toggleStudy} />
          </div>
          <div className="mx-5">
            <Button border onClick={createGlyphHandler}>
              保存
            </Button>
          </div>
        </div>
      </div>
      {isPreview ? (
        <GlyphPreviewer markdown={markdown} />
      ) : (
        <GlyphEditor markdown={markdown} setMarkdown={setMarkdown} />
      )}
    </>
  )
}