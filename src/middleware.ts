// middleware.ts
import { isNativeApp } from '@/lib/platform';
import { NextRequest, NextResponse } from 'next/server';

// 경로 그룹 변수 정의
const publicPaths = [
  '/',
  '/recruit',
  '/feed',
  '/complete',
  '/project-recruitment',
  '/portfolio-detail/',
  '/portfolio',
  '/studio',
  '/refresh',
];
const privatePaths = [
  '/my-page',
  '/project-management',
  '/letter',
  '/portfolio-register',
  '/project-register',
  '/notification',
];
const restrictedPaths = ['/login', '/register'];

export async function middleware(request: NextRequest) {
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-pathname', request.nextUrl.pathname);

  const url = request.nextUrl;
  const { status } = await getValidateToken(request);
  // console.log('status', status);
  const userAgent = request.headers.get('user-agent') || '';

  if (status === 403) {
    // console.log('accessToken 만료');
    if (request.nextUrl.pathname !== '/refresh' && isNativeApp(userAgent)) {
      // console.log('native app');
      return NextResponse.redirect(new URL('/refresh', request.url));
    }
  }

  // 로그인이 안되어있어도 접근할 수 있는 경로
  if (publicPaths.includes(url.pathname)) {
    if (url.pathname === '/') {
      url.pathname = '/feed';
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
    // 회원가입 페이지 보호 필요 : 나중에 작업
    if (url.pathname === '/register') {
      return NextResponse.next();
    }

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
    // auth
    '/login',
    '/register',
    '/complete',
    '/refresh',
    // main
    '/',
    '/feed',
    '/recruit',
    '/my-page/:path*',
    '/letter',
    '/notification',
    '/project-register',
    '/portfolio-register',
    '/studio/:path*',
    '/portfolio-detail/:path*',
    '/project-management/:path*',
    '/project-recruitment/:path*',
  ],
};
