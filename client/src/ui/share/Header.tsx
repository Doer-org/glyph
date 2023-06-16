import { SvgLogo } from '../svgs/SvgLogo'

export const Header = () => {
  return (
    <header className="flex items-center gap-3 p-5 h-[10vh]">
      <SvgLogo />
      <a className="font-bold text-2xl hover:opacity-50" href="/">
        Glyph
      </a>
    </header>
  )
}
