import { Murecho } from 'next/font/google'

import { getLoggedInUser } from '@/api'
import { getToken } from '@/features'
import { Header } from '@/ui/share/Header'
import './globals.css'
const murecho = Murecho({ weight: '100', subsets: ['latin'] })

export const metadata = {
  title: 'Glyph',
  description: 'Glyph is a document sharing application.',
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body style={{ fontFamily: `${murecho}` }}>{children}</body>
    </html>
  )
}
