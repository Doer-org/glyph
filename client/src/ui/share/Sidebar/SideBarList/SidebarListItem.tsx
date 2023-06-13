import { LinkTo } from '@/ui/LinkTo'
import { Txt } from '@/ui/Txt'
import { FC, ReactNode } from 'react'
type TProps = {
  children: ReactNode
  href: string
  logo?: ReactNode
}
export const SideBarListItem: FC<TProps> = ({ children, href, logo }) => {
  return (
    <LinkTo href={href} className="flex items-center gap-3">
      {logo}
      <Txt elm="p" weight="font-bold" className="hover:text-yellow-500">
        {children}
      </Txt>
    </LinkTo>
  )
}
