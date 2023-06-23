import { getLoggedInUser } from '@/api'
import { Auth, getToken } from '@/features'
import { Header } from '@/ui/share/Header'

export default async function ServiceLayout({ children }: { children: React.ReactNode }) {
  const user = await (async () => {
    const user = await getLoggedInUser(getToken() || '')
    if (user.type === 'error') return undefined
    return user.value.user
  })()

  return (
    <>
      {/* @ts-expect-error Server Component */}
      <Auth>
        <Header user={user} />
        <main>{children}</main>
      </Auth>
    </>
  )
}
