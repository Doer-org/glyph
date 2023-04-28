import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { readAllGlyphs } from './api/glyph';

export async function middleware(request: NextRequest) {
  console.log('middleware');
  console.log(request);
  // const glyphs = await readAllGlyphs();
  // console.log(request.nextUrl.pathname.split("/"));
  // console.log(glyphs);
}

export const config = {
  matcher: `${/^\/service(\/.*)?$/}`,
};
