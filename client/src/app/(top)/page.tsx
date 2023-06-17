import { getToken } from '@/api/utils/token'
import { getEnv } from '@/utils'

import { DiscordLink } from './_components/discordLink'
import { IntroduceContents } from './_components/introduceContents'

const { serverURL } = getEnv()
const Top = async () => {
  const resp = await fetch(`${serverURL}/auth/validate`, {
    method: 'GET',
    headers: { jwt: getToken() },
  })
  const isValid = resp.status !== 400

  return (
    <>
      <IntroduceContents />
      <DiscordLink />
    </>
  )
}
export default Top
