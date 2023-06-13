import { FC, ReactNode } from 'react'
import { LinkTo } from './LinkTo'
type TProps = {
  href: string
  children: ReactNode
  className?: string
}
export const StyledLinkTo: FC<TProps> = ({ href, children, className }) => {
  return (
    <LinkTo
      href={href}
      className={`border-2 rounded-md hover:bg-yellow-300 py-2 px-7 hover:scale-125 transition ${className}`}
    >
      {children}
    </LinkTo>
  )
}
