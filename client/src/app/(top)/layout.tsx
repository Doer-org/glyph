export default function Layout({ children }: { children: React.ReactNode }) {
  return <div className="flex flex-col items-center justify-center h-[80vh]">{children}</div>
}
