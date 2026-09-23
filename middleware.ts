import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const locales = ['en', 'ps', 'fa'];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (pathname === '/') {
    return NextResponse.redirect(new URL('/en', request.url));
  }

  const firstSegment = pathname.split('/').filter(Boolean)[0];
  if (firstSegment && locales.includes(firstSegment)) {
    const nextResponse = NextResponse.next();
    nextResponse.headers.set('x-locale', firstSegment);
    return nextResponse;
  }

  const url = new URL(request.url);
  const locale = 'en';
  url.pathname = `/${locale}${pathname === '/' ? '' : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)']
};
