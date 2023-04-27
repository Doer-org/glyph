// TODO(mao):ここにユーザー情報、記事一覧、コメント一覧をとってくる処理を書いてもらえれば！（UI部分だけでも大丈夫です！）
// memo: レイアウトは大体今書いてある感じでお願いします、確認してませんが

import { UserAllGlyphs } from "@/components/organisms/user/user-allglyphs";
import { UserComments } from "@/components/organisms/user/user-comments";
import { UserInformation } from "@/components/organisms/user/user-information";

// memo: componentを作るならorganisms配下にuser/を作って適切な名前で作ってもらえれば！（userGlyphsとかでいいと思います）
export default function UserSetting() {
  const user_id = "01GZ17MVNM8KWQMA43M2TRZWYP";

  return (
    <>
      <UserInformation id={user_id} />
      <div className="grid grid-cols-2">
        <UserAllGlyphs id={user_id} />
        <UserComments id={user_id} />
      </div>
    </>
  );
}
