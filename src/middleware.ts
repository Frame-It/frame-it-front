// middleware.ts
import { NextRequest, NextResponse } from 'next/server';

// 경로 그룹 변수 정의
const publicPaths = ['/', '/recruit', '/feed'];
const privatePaths = [
  '/my-page',
  '/studio',
  '/project-management',
  '/project-recruitment',
  '/letter',
  '/portfolio-register',
  '/project-register',
];
const restrictedPaths = ['/login', '/register', '/complete'];

export async function middleware(request: NextRequest) {
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-pathname', request.nextUrl.pathname);

  const url = request.nextUrl;
  const { status } = await getValidateToken(request);

  // 로그인이 안되어있어도 접근할 수 있는 경로
  if (publicPaths.includes(url.pathname)) {
    if (url.pathname === '/') {
      url.pathname = '/recruit';
      return NextResponse.redirect(url);
    }

    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
  }

  // 로그인이 되어있다면 접근할 수 없는 경로
  if (restrictedPaths.includes(url.pathname)) {
    return status === 200
      ? NextResponse.redirect(new URL('/', request.url))
      : NextResponse.next();
  }

  // 로그인이 되어있을 때만 접근할 수 있는 경로
  if (privatePaths.some((path) => url.pathname.startsWith(path))) {
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
    '/complete',
    '/recruit',
    '/register',
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
