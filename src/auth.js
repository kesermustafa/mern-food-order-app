import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import jwt from "jsonwebtoken";

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

                    return {
                        id: data.user._id,
                        sub: data.user._id,
                        email: data.user.email,
                        role: data.user.role,
                        token: data.token,
                    };
                } catch (error) {
                    console.error("Authorize error:", error);
                    return null;
                }
            },
        }),
    ],

    callbacks: {
        async jwt({token, user}) {
            if (user) {

                token.id = user.id;
                token.sub = user.id;
                token.role = user.role;
                token.accessToken = user.token;
            } else if (token?.accessToken) {

                try {
                    const decoded = jwt.decode(token.accessToken);
                    token.id = decoded?.id;
                    token.sub = decoded?.id;
                    token.role = decoded?.role;
                } catch (e) {
                    console.error("JWT decode error:", e);
                }
            }

            return token;
        },

        async session({session, token}) {
            session.user.id = token?.id;
            session.user.role = token?.role;
            session.user.token = token?.accessToken;
            return session;
        }
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
