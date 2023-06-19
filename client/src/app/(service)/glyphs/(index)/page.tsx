import { Glyphs, Title } from './_components'

const GlyphsPage = async () => {
  return (
    <>
      <Title />
      {/* @ts-expect-error Server Component */}
      <Glyphs />
    </>
  )
}

export default GlyphsPage
