import { NextPage } from 'next'
import { redirect } from 'next/navigation'

import { getLoggedInUser } from '@/api'
import { getToken } from '@/api/utils/token'

import { DiscordLink } from './_components/discordLink'
import { IntroduceContents } from './_components/introduceContents'

const Top = async () => {
  const token = getToken()
  const user = await getLoggedInUser(token)
  if (user.type === 'ok') {
    redirect('/glyphs/')
  }
  return (
    <>
      <IntroduceContents />
      <DiscordLink />
    </>
  )
}

export default Top
