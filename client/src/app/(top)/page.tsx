import { getToken } from '@/api/utils/token'
import { DiscordLink } from './_components/discordLink'
import { IntroduceContents } from './_components/introduceContents'

const Top = async () => {
  const resp = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/auth/validate`, {
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
