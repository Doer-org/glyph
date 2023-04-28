import { Txt } from '@/components/atoms/Txt';
import { TGlyph } from '@/types/Glyph';
import { FC } from 'react';
import { format } from 'date-fns';
import { GrDocumentText } from 'react-icons/gr';
import { LinkTo } from '@/components/atoms/LinkTo';
type TProps = {
  glyph: TGlyph;
};

export const Glyph: FC<TProps> = ({ glyph }) => {
  return (
    <LinkTo
      href={`service/glyphs/${glyph.id}`}
      className=" block  md:w-2/3 w-full"
    >
      <div className="border rounded-md border-black m-2 grid grid-cols-6 p-2 hover:bg-yellow-100 hover:cursor-pointer">
        <GrDocumentText
          size={40}
          fontWeight={1}
          className="place-self-center  justify-self-center col-span-2 lg:col-span-1"
        />
        <div className="col-span-4 lg:col-span-5">
          <Txt elm="h2" size="text-2xl">
            {glyph.title}
          </Txt>
          <Txt elm="p" size="text-sm">
            - {glyph.content.length}文字
          </Txt>
          <Txt elm="p" size="text-sm">
            - {format(new Date(glyph.updated_at), 'yyyy/MM/dd')}
          </Txt>
        </div>
      </div>
    </LinkTo>
  );
};
