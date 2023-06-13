import { SvgLogo } from '../svgs/SvgLogo'
import { Title } from '../Title'
import { Txt } from '../Txt'

export const Header = () => {
  return (
    <header className="bg-slate-900 w-screen px-9 py-3 shadow-2xl text-white fixed z-50">
      <div className="flex items-center gap-3">
        <SvgLogo />
        <Txt elm="h1" size="text-2xl">
          <Title />
        </Txt>
      </div>
    </header>
  )
}
