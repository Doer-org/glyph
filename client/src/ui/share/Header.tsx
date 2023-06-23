'use client'
import * as Avatar from '@radix-ui/react-avatar'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import { LogOut, User } from 'lucide-react'
import { FC } from 'react'

import { TUser } from '@/types/User'

import { LinkTo } from '../LinkTo'
import { SvgLogo } from '../svgs/SvgLogo'

type Props = {
  user?: TUser
}

export const Header: FC<Props> = ({ user }) => {
  return (
    <header className="flex items-center justify-between gap-3 p-5 h-[10vh]">
      <SvgLogo />
      <a className="font-bold text-2xl hover:opacity-50" href="/">
        Glyph
      </a>
      <div className="ml-auto">
        {user && (
          <DropdownMenu.Root>
            <DropdownMenu.Trigger>
              <Avatar.Root className=" inline-flex h-[45px] w-[45px] select-none items-center justify-center overflow-hidden rounded-full align-middle">
                <Avatar.Image
                  className="h-full w-full rounded-[inherit] object-cover"
                  src={user?.Img}
                  alt="Pedro Duarte"
                />
                <Avatar.Fallback
                  className="leading-1 flex h-full w-full items-center justify-center bg-white text-[15px] font-medium"
                  delayMs={600}
                >
                  {user?.Name.slice(0, 1)}
                </Avatar.Fallback>
              </Avatar.Root>
            </DropdownMenu.Trigger>
            <DropdownMenu.Portal>
              <DropdownMenu.Content
                className="min-w-[220px] bg-white rounded-md p-[5px] shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] will-change-[opacity,transform] data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade"
                sideOffset={5}
              >
                <DropdownMenu.Item>
                  <LinkTo
                    className="hover:bg-gray-200 group text-[13px] leading-none text-violet11 rounded-[3px] flex items-center h-[25px] px-[5px] relative pl-[25px] select-none outline-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:bg-violet9 data-[highlighted]:text-violet1"
                    href={`/users/${user.Id}`}
                  >
                    <User className="mr-2 h-4 w-4" />
                    Profile
                  </LinkTo>
                </DropdownMenu.Item>
                <DropdownMenu.Item>
                  <LinkTo
                    className="hover:bg-gray-200 group text-[13px] leading-none text-violet11 rounded-[3px] flex items-center h-[25px] px-[5px] relative pl-[25px] select-none outline-none data-[disabled]:text-mauve8 data-[disabled]:pointer-events-none data-[highlighted]:bg-violet9 data-[highlighted]:text-violet1"
                    href="/logout"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    <LinkTo href="/logout">Log out</LinkTo>
                  </LinkTo>
                </DropdownMenu.Item>
              </DropdownMenu.Content>
            </DropdownMenu.Portal>
          </DropdownMenu.Root>
        )}
      </div>
    </header>
  )
}
