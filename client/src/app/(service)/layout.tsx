import { Auth } from '@/features'

export default function ServiceLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* @ts-expect-error Server Component */}
      <Auth>{children}</Auth>
    </>
  )
}
