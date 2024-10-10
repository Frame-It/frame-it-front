// middleware.ts
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-pathname', request.nextUrl.pathname);

  const url = request.nextUrl;

  if (url.pathname === '/') {
    url.pathname = '/recruit';
    return NextResponse.redirect(url);
  }

  // if (url.pathname === '/login') {
  //   const token = getCookie('accessToken');
  //   return !token
  //     ? NextResponse.next()
  //     : NextResponse.redirect(new URL('/', request.url));
  // }

  if (url.pathname === '/my-page') {
    const cookieStore = cookies();
    const token = cookieStore.get('accessToken');

    return token?.value
      ? NextResponse.next()
      : NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}
