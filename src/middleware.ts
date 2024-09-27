import { NextRequest, NextResponse } from 'next/server';
import { getUrl } from './lib/get-url';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('authjs.session-token');
  const pathname = request.nextUrl.pathname;
  const url = new URL(request.url);

  // Logado não deve acessar a página de login ou registro
  if ((pathname === '/auth/login' || pathname === '/auth/register') && token) {
    return NextResponse.redirect(new URL('/', url));
  }

  // Deslogado não deve acessar páginas protegidas
  if (!token && pathname !== '/auth/login' && pathname !== '/auth/register') {
    return NextResponse.redirect(new URL('/auth/login', url));
  }
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
