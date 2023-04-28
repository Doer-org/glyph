import { WsComments } from '@/components/organisms/comments/wsComments';
import { Comments as CommentComponent } from '@/components/organisms/comments';
export const metadata = {
  title: 'Comment',
};
export default function Comments() {
  // TODO: user情報を取得する
  return (
    <div>
      <WsComments
        glyphId={'aa'}
        user={{
          user_id: 'string',
          user_name: 'aoki',
          user_img:
            'https://pbs.twimg.com/profile_images/1354479643882004483/Btnfm47p_400x400.jpg',
        }}
      />
      <CommentComponent glyphId={'aa'} user_id={'kengo'} />
    </div>
  );
}
