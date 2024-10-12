// middleware.ts
import { NextRequest, NextResponse } from 'next/server';
// import { getCookie } from 'cookies-next';

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

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}
