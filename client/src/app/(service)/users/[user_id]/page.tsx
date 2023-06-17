import { getToken } from '@/api/utils/token'

import { User, UserComments, UserGlyphs } from './_component'

// memo: componentを作るならorganisms配下にuser/を作って適切な名前で作ってもらえれば！（userGlyphsとかでいいと思います）
export default function UserSetting() {
  const user_id = '01GZ17MVNM8KWQMA43M2TRZWYP'

  return (
    <>
      <User id={user_id} token={getToken()} />
      <div className="grid grid-cols-1 md:grid-cols-2 my-14">
        <UserGlyphs id={user_id} />
        <UserComments id={user_id} />
      </div>
    </>
  )
}
