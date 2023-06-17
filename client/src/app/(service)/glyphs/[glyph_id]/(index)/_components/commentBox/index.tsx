import { FC, ReactNode } from 'react'

type TProps = { children: ReactNode }

export const CommentBox: FC<TProps> = ({ children }) => {
  return <div className="h-[40vh] rounded-md p-2 relative overflow-y-scroll hidden-scrollbar w-full">{children}</div>
}
