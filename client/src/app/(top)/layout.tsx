import { Header } from '@/ui/share/Header'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main>
        <div className="flex flex-col items-center justify-center h-[80vh]">{children}</div>
      </main>
    </>
  )
}
