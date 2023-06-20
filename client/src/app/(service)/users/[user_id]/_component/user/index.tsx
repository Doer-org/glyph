'use client'
import Image from 'next/image'
import { useEffect, useState, type FC } from 'react'

import { readUser } from '@/api'
import { UserResponse } from '@/api/user/types'

type UserProps = {
  id: string
  token?: string
}

export const User: FC<UserProps> = ({ id, ...props }) => {
  const [user, setUser] = useState<UserResponse | null>(null)

  useEffect(() => {
    const getUser = async (id: string) => {
      const user = await readUser(id, props.token)
      if (user.type === 'error') {
        console.log('Error:', user.error)
        return
      }
      setUser(user.value)
    }
    getUser(id)
  }, [id, props.token])

  const testuser = {
    data: { name: 'test', img: 'https://github.com/meow520.png' },
  }

  return (
    <div className="flex items-center text-center gap-5">
      <Image src={testuser?.data.img} width={120} height={120} alt={'icon'} className="rounded-full" />
      <h1 className="text-3xl font-bold">{testuser?.data.name}</h1>
    </div>
  )
}
