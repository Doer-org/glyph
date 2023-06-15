export const DiscordLink = () => {
  const url = `${process.env.NEXT_PUBLIC_SERVER_URL}/auth/login?redirect_url=${process.env.NEXT_PUBLIC_FRONT_URL}/glyphs`
  return (
    <a href={url} className="py-3 px-4 bg-blue-700 rounded-md text-white font-bold hover:opacity-90">
      Discordでログインする !
    </a>
  )
}
