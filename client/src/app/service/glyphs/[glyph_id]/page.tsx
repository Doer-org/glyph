import { readGlyph } from '@/api/glyph';
import { readUser } from '@/api/user';
import { getToken } from '@/api/utils/token';
import { StyledLinkTo } from '@/components/atoms/StyledLinkTo';
import { Txt } from '@/components/atoms/Txt';
import { GlyphDetail } from '@/components/organisms/glyphs/glyphDetail';

type TProps = {
  params: { glyph_id: string };
  searchParams: { id: string };
};

const GlyphPage = async ({ params }: TProps) => {
  const token = getToken();
  const user = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/auth/user`, {
    method: 'GET',
    headers: {
      jwt: token,
    },
  });
  const info = await user.json();
  const userInfo = await readUser(info.user.Id, getToken());
  const u = {
    user_id: userInfo.type === 'ok' ? userInfo.value.data.id : 'string',
    user_name: userInfo.type === 'ok' ? userInfo.value.data.name : '名無し',
    user_img:
      'https://pbs.twimg.com/profile_images/1354479643882004483/Btnfm47p_400x400.jpg',
  };
  const glyph = await readGlyph(params.glyph_id);
  if (glyph.type === 'error') {
    return <p>Glyphが取得できない</p>;
  }
  console.log(glyph);
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
          user_id: u.user_id,
          user_name: u.user_name,
          user_img: u.user_img,
        }}
      />
    </>
  );
};
export default GlyphPage;
