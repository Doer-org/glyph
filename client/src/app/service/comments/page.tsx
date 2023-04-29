import { WsComments } from '@/components/organisms/comments/wsComments';
import { Comments as CommentComponent } from '@/components/organisms/comments';
import { getToken } from '@/api/utils/token';
import { readUser } from '@/api';
export const metadata = {
  title: 'Comment',
};
export default async function Comments() {
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
  const glyph_id = 'aa'; // TODO: Glyph ID
  return (
    <div>
      <WsComments glyphId={glyph_id} user={u} />
      <CommentComponent glyphId={glyph_id} user_id={u.user_id} />
    </div>
  );
}
