'use client'
import Image from 'next/image'
import { type FC } from 'react'

import { TUser } from '@/types/User'

type TProps = { user: TUser }

export const User: FC<TProps> = ({ user }) => {
  return (
    <div className="flex items-center text-center gap-5">
      {/* <Image
        src={user.Img}
        width={120}
        height={120}
        alt={'icon'}
        className="rounded-full"
      /> */}
      <h1 className="text-3xl font-bold">{user.Name}</h1>
    </div>
  )
}
