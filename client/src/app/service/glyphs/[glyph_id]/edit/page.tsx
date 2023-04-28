import { Txt } from '@/components/atoms/Txt';
import { TGlyph } from '@/types/Glyph';
import dynamic from 'next/dynamic';
const GlyphEditForm = dynamic(
 () => import('@/components/organisms/glyphs/glyphEditForm'),
 { ssr: false },
);

export const metadata = {
 title: 'Glyph edit',
};
type TProps = {
 params: { glyph_id: string };
 searchParams: { id: string };
};
export default function Edit({ params }: TProps) {
 console.log(params.glyph_id);
 const GlyphMock: TGlyph = {
  id: '1',
  author_id: 'uu',
  title: 'F#勉強会',
  content: '## aaa  \n- ggg',
  prev_glyph: '1',
  next_glyph: '2',
  status: 'Draft',
  is_study: false,
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
 };
 return (
  <>
   <Txt elm="h2" size="text-3xl" className="text-center pb-10">
    {GlyphMock.title}(編集中)
   </Txt>
   <GlyphEditForm glyph={GlyphMock} />
  </>
 );
}
