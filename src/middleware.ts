import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

const JWT_SECRET = process.env.JWT_SECRET || "super-secret-default-key-calcom-clone";
const encodedKey = new TextEncoder().encode(JWT_SECRET);

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('calcom_token')?.value;

  if (request.nextUrl.pathname.startsWith('/dashboard')) {
    if (!token) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
    try {
      await jwtVerify(token, encodedKey);
      return NextResponse.next();
    } catch {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  // Redirect from login/register to dashboard if already logged in
  if (['/login', '/register'].includes(request.nextUrl.pathname) && token) {
    try {
      await jwtVerify(token, encodedKey);
      return NextResponse.redirect(new URL('/dashboard', request.url));
    } catch { /* ignore expired token, let them log in */ }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/login', '/register'],
};
