import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';

export const config = {
  matcher: ['/service(.)*'],
};

export const middleware = async (request: NextRequest) => {
  const cookie = request.headers.get('cookie') ?? '';
  const resp = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/auth/validate`,
    {
      method: 'GET',
      headers: {
        jwt: cookie.split('=')[1],
      },
    },
  );
  if (resp.status === 400) {
    return NextResponse.redirect(`${request.nextUrl.origin}/`);
  }
  return NextResponse.next();
};
