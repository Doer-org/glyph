import { FC, ReactNode } from 'react'

import { LinkTo } from '.'

type TProps = {
  href: string
  children: ReactNode
  className?: string
}

export const PopLinkTo: FC<TProps> = ({ href, children, className }) => {
  return (
    <LinkTo
      href={href}
      className={`w-full shadow-origin rounded-md hover:cursor-pointer p-3 border-neutral-700 border-2 translate-x-0 translate-y-0 hover:translate-x-4 hover:translate-y-4 hover:shadow-inherit transition
       shadow-neutral-700 hover:opacity-90 ${className}`}
    >
      {children}
    </LinkTo>
  )
}
