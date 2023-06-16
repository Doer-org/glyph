import { SvgLogo } from '../svgs/SvgLogo'

export const Header = () => {
  return (
    <header className="flex items-center gap-3 p-5 h-[10vh]">
      <SvgLogo />
      <h1 className="font-bold text-2xl">Glyph</h1>
    </header>
  )
}
