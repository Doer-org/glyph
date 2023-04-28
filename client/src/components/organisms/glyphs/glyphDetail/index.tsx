'use client';
import { TGlyph } from '@/types/Glyph';
import { FC } from 'react';
import { GlyphPreviewer } from '../glyphPreviewer';
import { Comments } from '../../comments';
import { WsComments } from '../../comments/wsComments';
import { AES, enc } from 'crypto-js';
type TProps = {
  glyph: TGlyph;
};

export const GlyphDetail: FC<TProps> = ({ glyph }) => {
  const decrypt = AES.decrypt(glyph.content, 'markdown').toString(enc.Utf8);
  return (
    <div className="lg:flex block">
      <div className="lg:w-2/3 w-full">
        <GlyphPreviewer markdown={decrypt} />
      </div>
      <div className="lg:w-1/3 lg:my-0 w-full my-10 ">
        <div className="lg:ml-2 transition">
          {glyph.is_study ? (
            // trueならwebsocketを扱うcommentsを返す
            <WsComments glyphId={glyph.id} />
          ) : (
            <Comments glyphId={glyph.id} />
          )}
        </div>
      </div>
    </div>
  );
};
