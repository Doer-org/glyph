import { StyledLinkTo } from '@/components/atoms/StyledLinkTo';
import { Txt } from '@/components/atoms/Txt';
import { GlyphDetail } from '@/components/organisms/glyphs/glyphDetail';
import { TGlyph } from '@/types/Glyph';
type TProps = {
  params: { glyph_id: string };
  searchParams: { id: string };
};
export default function Glyph({ params }: TProps) {
  console.log(params.glyph_id);
  // TODO(aoki): mockを置き換えて動作確認までできるとすごい！！！
  const GlyphMock: TGlyph = {
    id: '1',
    author_id: 'uu',
    title: 'F#勉強会',
    content: '## aaa  \n- ggg',
    prev_glyph: '1',
    next_glyph: '2',
    status: 'Draft',
    is_study: false,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  return (
    <>
      <Txt elm="h2" size="text-3xl" className="text-center pb-10">
        {GlyphMock.title}
      </Txt>
      <div className="text-center mb-10">
        <StyledLinkTo href={`/service/glyphs/${GlyphMock.id}/edit`}>
          編集
        </StyledLinkTo>
      </div>
      <GlyphDetail glyph={GlyphMock} />
    </>
  );
}
