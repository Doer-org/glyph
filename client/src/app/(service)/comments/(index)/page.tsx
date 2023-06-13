import { getLoggedInUser } from '@/api'
import { Txt } from '@/components/atoms/Txt'
import { getToken } from '@/features/auth'
import { TComment } from '@/types/Comment'
import { Comments } from './_components'

export const metadata = { title: 'Comment' }
export default async function CommentsPage() {
  const token = getToken()
  const userResp = await getLoggedInUser(token || '')
  const loggedInUser = userResp.type === 'ok' && userResp.value.user
  const glyph_id = 'aa' // TODO: Glyph ID
  const CommentMock: TComment[] = [
    { id: '1', author_id: '1', glyph_id: '1', contents: 'コメント1', created_at: '1' },
    { id: '1', author_id: '1', glyph_id: '1', contents: 'コメント2', created_at: '1' },
  ]
  return (
    <>
      <Txt elm="h2" size="text-3xl" className="text-center pb-10">
        Comments一覧
      </Txt>
      <div className="m-auto">
        {CommentMock === null ? <p>commentはありません</p> : <Comments comments={CommentMock} />}
      </div>
    </>
  )
}
