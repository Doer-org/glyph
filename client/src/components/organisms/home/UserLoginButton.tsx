'use client';
import { createUser } from '@/api/user';
import { Button } from '@/components/atoms/Button';
import { LinkTo } from '@/components/atoms/LinkTo';

export const UserLoginButton = () => {
  return (
    <>
      <Button onClick={() => console.log('button')}>ログインする</Button>
      <LinkTo href="/service/glyphs">Glyph一覧へ</LinkTo>
    </>
  );
};
