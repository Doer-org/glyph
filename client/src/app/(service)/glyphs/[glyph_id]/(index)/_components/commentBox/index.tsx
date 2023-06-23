import { FC, ReactNode } from 'react'

type TProps = { children: ReactNode }

export const CommentBox: FC<TProps> = ({ children }) => {
  return <div className="lg:h-[50vh] rounded-md p-2 overflow-y-scroll hidden-scrollbar">{children}</div>
}
