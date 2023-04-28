import { readGlyph } from '@/api/glyph';
import { StyledLinkTo } from '@/components/atoms/StyledLinkTo';
import { Txt } from '@/components/atoms/Txt';
import { GlyphDetail } from '@/components/organisms/glyphs/glyphDetail';

type TProps = {
  params: { glyph_id: string };
  searchParams: { id: string };
};

const GlyphPage = async ({ params }: TProps) => {
  console.log(params.glyph_id);
  const glyph = await readGlyph(params.glyph_id);
  if (glyph.type === 'error') {
    return <p>Glyphが取得できない</p>;
  }

  return (
    <>
      <Txt elm="h2" size="text-3xl" className="text-center pb-10">
        {glyph.value.data.title}
      </Txt>
      <div className="text-center mb-10">
        <StyledLinkTo href={`/service/glyphs/${glyph.value.data.id}/edit`}>
          編集
        </StyledLinkTo>
      </div>
      {/* //TODO: ユーザー情報を取得 */}
      <GlyphDetail
        glyph={glyph.value.data}
        user={{
          user_id: 'string',
          user_name: 'aoki',
          user_img:
            'https://pbs.twimg.com/profile_images/1354479643882004483/Btnfm47p_400x400.jpg',
        }}
      />
    </>
  );
};
export default GlyphPage;
