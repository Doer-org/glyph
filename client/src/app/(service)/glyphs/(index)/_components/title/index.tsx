import { StyledLinkTo } from '@/ui/StyledLinkTo'
import { Txt } from '@/ui/Txt'

export const Title = () => {
  return (
    <div className="flex items-center my-10">
      <Txt elm="h1" size="text-3xl" weight="font-bold" className="text-center">
        投稿
      </Txt>
      <StyledLinkTo href="/glyphs/new" className="ms-auto">
        Glyph作成
      </StyledLinkTo>
    </div>
  )
}
