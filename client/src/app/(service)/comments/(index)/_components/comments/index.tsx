import { TComment } from '@/types/Comment'
import { LinkTo } from '@/ui/LinkTo'
import { Txt } from '@/ui/Txt'
import { FC } from 'react'
import { AiOutlineComment } from 'react-icons/ai'
type TProps = {
  comments: TComment[]
}
export const Comments: FC<TProps> = ({ comments }) => {
  return (
    <>
      {comments.map((comment) => {
        return (
          <LinkTo key={comment.id} href={`/glyphs/${comment.glyph_id}`} className=" block md:w-2/3 m-auto w-full">
            <div className="border rounded-md border-black m-2 grid grid-cols-6 p-2 hover:bg-yellow-100 hover:cursor-pointer items-center">
              <AiOutlineComment
                size={40}
                fontWeight={1}
                className="place-self-center  justify-self-center col-span-2 lg:col-span-1"
              />
              <div className="col-span-4 lg:col-span-5">
                <Txt elm="h2" size="text-2xl">
                  {comment.contents}
                </Txt>
              </div>
            </div>
          </LinkTo>
        )
      })}
    </>
  )
}
