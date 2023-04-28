'use client';
import { LinkTo } from '@/components/atoms/LinkTo';

export const UserLoginButton = () => {
  return (
    <>
      <LinkTo
        href={`${process.env.NEXT_PUBLIC_SERVER_URL}/auth/login?redirect_url=${process.env.NEXT_PUBLIC_CLIANT_URL}/service/glyphs`}
      >
        ログイン
      </LinkTo>
      <LinkTo href="/service/glyphs">Glyph一覧へ</LinkTo>
    </>
  );
};
