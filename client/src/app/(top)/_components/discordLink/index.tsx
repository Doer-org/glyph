import { getEnv } from '@/utils'
const { serverURL, clientURL } = getEnv()
export const DiscordLink = () => {
  const url = `${serverURL}/auth/login?redirect_url=${clientURL}/glyphs`
  return (
    <a href={url} className="py-3 px-4 bg-blue-700 rounded-md text-white font-bold hover:opacity-90">
      Discordでログインする !
    </a>
  )
}
