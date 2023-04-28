"use client";
import { GlyphResponse } from "@/api/glyph/types";
import { LinkTo } from "@/components/atoms/LinkTo";
import { Txt } from "@/components/atoms/Txt";
import { TGlyph } from "@/types/Glyph";
import { format } from "date-fns";
import React, { FC, useEffect, useState } from "react";
import { GrDocumentText } from "react-icons/gr";

type UserAllGlyphsProps = {
  id: string;
};

export const UserAllGlyphs: FC<UserAllGlyphsProps> = ({ id }) => {
  const [glyphs, setGlyphs] = useState<TGlyph[] | null>(null);
  useEffect(() => {
    const getGlyphs = async (id: string) => {};
  });
  const testglyphs:TGlyph[] = [
    {
      id: "1",
      author_id: "test",
      title: "test",
      content: "test",
      status: "Draft",
      isStudy: false,
      prev_glyph:"",
      next_glyph:"",
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      id: "2",
      author_id: "test",
      title: "test",
      content: "test",
      status: "Draft",
      isStudy: false,
      prev_glyph:"",
      next_glyph:"",
      created_at: new Date(),
      updated_at: new Date(),
    },
  ];
  return (
    <div>
      <div className="text-2xl">Glyphs一覧</div>
      {testglyphs?.map((glyph: TGlyph, index: number) => (
        <div key={index} className="">
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
                  - {format(glyph.updated_at, "yyyy/MM/dd")}
                </Txt>
              </div>
            </div>
          </LinkTo>
        </div>
      ))}
    </div>
  );
};
