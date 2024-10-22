// middleware.ts
import { NextRequest, NextResponse } from 'next/server';

export async function middleware(request: NextRequest) {
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-pathname', request.nextUrl.pathname);

  const url = request.nextUrl;

  if (url.pathname === '/') {
    url.pathname = '/recruit';

    return NextResponse.redirect(url);
  } else if (url.pathname === '/login') {
    const { status, res } = await getValidateToken(request);
    return status !== 200
      ? res
      : NextResponse.redirect(new URL('/', request.url));
  } else if (
    !url.pathname.startsWith('/recruit') &&
    !url.pathname.startsWith('/feed')
  ) {
    const { status } = await getValidateToken(request);

    return status === 200
      ? NextResponse.next({
          request: {
            headers: requestHeaders,
          },
        })
      : NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

async function getValidateToken(req: NextRequest) {
  const accessToken = req.cookies.get('accessToken')?.value;
  const nextRes = NextResponse.next();

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/tokens/validate`,
    {
      method: 'GET',
      cache: 'no-store',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );

  if (res.status === 403) {
    nextRes.cookies.set('accessToken', '', { maxAge: 0 });
  }

  return {
    status: res.status,
    res: nextRes,
  };
}

export const config = {
  matcher: [
    '/',
    '/recruit',
    '/feed',
    '/project-register',
    '/portfolio-register',
    '/letter',
    '/my-page/:path*',
    '/studio/:path*',
    '/project-management/:path*',
    '/project-recruitment/:path*',
  ],
};
