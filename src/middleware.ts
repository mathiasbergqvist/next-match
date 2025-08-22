import { NextAuthRequest } from 'next-auth';
import { auth } from './auth';
import { authRoutes, publicRoutes } from './routes';
import { NextResponse } from 'next/server';

export default auth((req: NextAuthRequest) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;

  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);

  if (isPublicRoute) {
    return NextResponse.next();
  }

  if (isAuthRoute) {
    if (isLoggedIn) {
      return NextResponse.redirect(new URL('/members', nextUrl));
    }

    return NextResponse.next();
  }

  if (!isPublicRoute && !isLoggedIn) {
    return NextResponse.redirect(new URL('/login', nextUrl));
  }

  return NextResponse.next();
});

export const config = {
  // Match all paths except for API routes and static files. No need for auth on these routes.
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
