import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith('/api')) {
    return NextResponse.rewrite(new URL('/', request.url));
  }
  if (request.nextUrl.pathname.startsWith('/App/Auth')) {
    return NextResponse.rewrite(new URL('/', request.url));
  }
  if (request.nextUrl.pathname.startsWith('/App/Layout')) {
    return NextResponse.rewrite(new URL('/', request.url));
  }
  if (request.nextUrl.pathname.startsWith('/App/Payments')) {
    return NextResponse.rewrite(new URL('/', request.url));
  }
  if (request.nextUrl.pathname.startsWith('/App/Loading')) {
    return NextResponse.rewrite(new URL('/', request.url));
  }
  if (request.nextUrl.pathname.startsWith('/App/Main')) {
    return NextResponse.rewrite(new URL('/', request.url));
  }
  if (request.nextUrl.pathname.startsWith('/Layout')) {
    return NextResponse.rewrite(new URL('/', request.url));
  }
}
