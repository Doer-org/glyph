import { useState } from 'react'

import { useWebSocketApi } from '@/hooks/useWebSocketApi'
import { getEnv } from '@/utils'
const { wsURL } = getEnv()

type Comment = {
  type: 'comment'
  data: {
    user_name: string
    user_img: string
    user_id: string
    comment: string
  }
}

export const useWebSocketComments = (
  glyphId: string,
  user: {
    user_name: string
    user_img: string
    user_id: string
  }
) => {
  const [wsComments, setWsComments] = useState<Comment[]>([])
  const { send, connectionStatus } = useWebSocketApi(`${wsURL}/ws/${glyphId}`, [
    (msg) => {
      if (msg.type !== 'comment') return undefined
      setWsComments([...wsComments, msg as Comment])
    },
  ])
  const sendComment = (comment: string) => {
    send(
      JSON.stringify({
        type: 'comment',
        data: {
          comment: comment,
          ...user,
        },
      })
    )
  }
  return { wsComments, sendComment, connectionStatus }
}
