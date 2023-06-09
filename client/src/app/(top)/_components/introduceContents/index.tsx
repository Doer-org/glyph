import { SvgLogo } from '@/ui/svgs/SvgLogo'

export const IntroduceContents = () => {
  return (
    <>
      <div className="animate-spinner">
        <SvgLogo width="200" height="160" />
      </div>
      <div className="my-7 text-center">
        <h1 className="font-bold text-base md:text-3xl">Glyphでコミュニティの活動を活発にしよう!!</h1>
      </div>
    </>
  )
}
