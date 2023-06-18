import dynamic from 'next/dynamic'

const GlyphForm = dynamic(() => import('@/features/markdown/glyphForm'), { ssr: false })

export const GlyphCreateForm = () => {
  return (
    <div>
      <GlyphForm actionKind="create" />
    </div>
  )
}
