import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const authConfig = {
    providers: [
        Credentials({
            name: "Credentials",
            credentials: {
                email: {label: "Email", type: "email"},
                password: {label: "Password", type: "password"},
            },
            async authorize(credentials) {
                try {
                    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/auth/login`, {
                        method: "POST",
                        headers: {"Content-Type": "application/json"},
                        body: JSON.stringify({
                            email: credentials.email,
                            password: credentials.password,
                        }),
                    });

                    const data = await res.json();

                    if (!res.ok || !data.user || !data.token) {
                        console.error("Login failed:", data.message || data);
                        return null;
                    }

                    // Dönmesi gereken minimum bilgiler
                    return {
                        id: data.user.id,
                        email: data.user.email,
                        role: data.user.role,
                        token: data.token, // backend'in döndürdüğü JWT
                    };
                } catch (error) {
                    console.error("Authorize error:", error);
                    return null;
                }
            },
        }),
    ],

    callbacks: {
        async jwt({token, user, account}) {
            // İlk login'de user ve account gelir
            if (user && account) {
                console.log('JWT Callback - User:', user);
                token.id = user.id;
                token.role = user.role;
                token.accessToken = user.token;
            }
            return token;
        },

        async session({session, token}) {
            console.log('Session Callback - Token:', token);
            if (token) {
                session.user.id = token.id;
                session.user.role = token.role;
                session.user.token = token.accessToken;
            }
            console.log('Session Callback - Final Session:', session);
            return session;
        },
    },

    pages: {
        signIn: "/auth/login",
    },

    session: {
        strategy: "jwt",
    },

    debug: process.env.NODE_ENV === "development",
};

export const {handlers, auth, signIn, signOut} = NextAuth(authConfig);

export const middlewareConfig = {
    matcher: ["/dashboard/:path*", "/admin/:path*", "/profile/:path*", "/auth/login"],
};
