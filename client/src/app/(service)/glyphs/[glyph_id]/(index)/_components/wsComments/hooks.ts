import { useState } from 'react'

import { UserResponse } from '@/api/user/types'
import { useWebSocketApi } from '@/hooks/useWebSocketApi'
import { getEnv } from '@/utils'
const { wsURL } = getEnv()

type Comment = {
  type: 'comment'
  data: {
    userName: string
    userImg: string
    userId: string
    comment: string
  }
}

type TProps = { glyphId: string; user: UserResponse['data'] }

export const useWebSocketComments = ({ glyphId, user }: TProps) => {
  const [wsComments, setWsComments] = useState<Comment[]>([])
  const { send, connectionStatus } = useWebSocketApi(`${wsURL}/ws/${glyphId}`, [
    (msg) => {
      if (msg.type !== 'comment') return undefined
      setWsComments([...wsComments, msg as Comment])
    },
  ])
  const sendComment = (comment: string) => {
    send(JSON.stringify({ type: 'comment', data: { comment: comment, ...user } }))
  }
  return { wsComments, sendComment, connectionStatus }
}
