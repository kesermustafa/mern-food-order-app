import {auth} from "@/src/auth";

export default auth((req) => {
    const {nextUrl} = req;
    const isLoggedIn = !!req.auth;
    const role = req.auth?.user?.role;

    // 1. Giriş yapmış kullanıcı login sayfasına gidiyorsa ana sayfaya yönlendir
    if (nextUrl.pathname === '/auth/login' && isLoggedIn) {
        return Response.redirect(new URL('/', nextUrl));
    }

    // 2. Dashboard'a gidiyorsa ve login değilse login'e yönlendir
    if (nextUrl.pathname.startsWith('/dashboard') && !isLoggedIn) {
        return Response.redirect(new URL('/auth/login', nextUrl));
    }

    // 3. Admin sayfalarına gidiyorsa ama ADMIN değilse ana sayfaya yönlendir
    if (nextUrl.pathname.startsWith('/admin') && role !== 'ADMIN') {
        return Response.redirect(new URL('/', nextUrl));
    }

    // /profile sayfası: Giriş yapılmamışsa login'e yönlendir
    if (nextUrl.pathname.startsWith('/profile') && !isLoggedIn) {
        const callbackUrl = nextUrl.href;
        return Response.redirect(new URL(`/auth/login?callbackUrl=${encodeURIComponent(callbackUrl)}`, nextUrl));
    }

    // Devam et
    return;
});

export const config = {
    matcher: [
        '/dashboard/:path*',
        '/admin/:path*',
        '/profile/:path*',
        '/auth/login',
    ],
};
