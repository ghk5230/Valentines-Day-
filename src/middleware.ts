import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('valentine_auth')?.value;
  const expected = process.env.VALENTINE_AUTH_TOKEN;

  // Protect /valentine — redirect to /login when not authenticated
  if (request.nextUrl.pathname.startsWith('/valentine')) {
    if (!token || !expected || token !== expected) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  // Already authenticated — skip login page
  if (request.nextUrl.pathname === '/login') {
    if (token && expected && token === expected) {
      return NextResponse.redirect(new URL('/valentine', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/valentine/:path*', '/login'],
};
