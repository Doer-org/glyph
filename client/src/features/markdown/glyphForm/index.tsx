'use client'

import { useRouter } from 'next/navigation'
import { FC, useState } from 'react'

import { createGlyph, editGlyph } from '@/api/glyph'
import { GlyphEditor } from '@/features/markdown/glyphEditor'
import { GlyphPreviewer } from '@/features/markdown/glyphPreviewer'
import { useToggle } from '@/hooks/common/useToggle'
import { TGlyph } from '@/types/Glyph'
import { TUser } from '@/types/User'
import { Button } from '@/ui/Button'
import { Input } from '@/ui/Input'

import 'easymde/dist/easymde.min.css'
import { GlyphStatusToggleButton } from '../glyphStatusToggleButton'

type TProps = { glyph?: TGlyph; actionKind: 'create' | 'edit'; user: TUser }

const GlyphForm: FC<TProps> = ({ glyph, actionKind, user }) => {
  const router = useRouter()
  const [markdown, setMarkdown] = useState<string>(glyph?.content ?? '')
  const { bool: isPreview, toggle: togglePreview } = useToggle(glyph?.status === 'Private')
  const { bool: isPublic, toggle: togglePublic, toFalse: notPublic } = useToggle(glyph?.status === 'Public')
  const { bool: isDraft, toggle: toggleDraft, toFalse: notDraft } = useToggle(glyph?.status === 'Draft')
  const { bool: isStudy, toggle: toggleStudy } = useToggle(glyph?.is_study)
  const [title, setTitle] = useState<string>(glyph?.title ?? '')
  const statusDefineder = (): TGlyph['status'] => {
    if (isPublic && isDraft) return 'Draft'
    if (isPublic && !isDraft) return 'Public'
    if (!isPublic && isDraft) return 'Draft'
    if (isPublic && !isDraft) return 'Private'
    return 'Draft'
  }

  const togglePublicFunc = () => {
    togglePublic()
    if (isDraft) notDraft()
  }

  const toggleDraftFunc = () => {
    toggleDraft()
    if (isPublic) notPublic()
  }

  const handleAction = () => {
    if (actionKind === 'create') {
      createGlyph({
        author_id: user.Id,
        title: title,
        content: markdown,
        status: statusDefineder(),
        is_study: isStudy,
        prev_glyph: 'string',
        next_glyph: 'string',
      })
    }
    if (actionKind === 'edit') {
      if (!glyph) return
      editGlyph({
        id: glyph.id,
        title: title,
        content: markdown,
        status: statusDefineder(),
        is_study: isStudy,
        prev_glyph: 'string',
        next_glyph: 'string',
      })
    }

    router.push('/glyphs')
  }

  if (actionKind === 'edit' && !glyph) return <p>コンテンツが取得できませんでした</p>

  return (
    <div className="md:mx-10 mx-5">
      <div className="text-center mb-1 lg:flex items-end lg:justify-between justify-center py-3">
        <Input type="text" label="タイトル：" content={title} changeContent={setTitle} />
        <div className="flex gap-3 items-end justify-center">
          <GlyphStatusToggleButton status={isPreview} statusText="切り替え" toggleFunc={togglePreview} />
          <GlyphStatusToggleButton status={isPublic} statusText="外部に公開" toggleFunc={togglePublicFunc} />
          <GlyphStatusToggleButton status={isDraft} statusText="下書き" toggleFunc={toggleDraftFunc} />
          <GlyphStatusToggleButton status={isStudy} statusText="勉強会中" toggleFunc={toggleStudy} />
          <Button border onClick={handleAction} className="mx-5">
            保存
          </Button>
        </div>
      </div>

      {isPreview ? (
        <GlyphPreviewer markdown={markdown} />
      ) : (
        <GlyphEditor markdown={markdown} setMarkdown={setMarkdown} />
      )}
    </div>
  )
}

export default GlyphForm
