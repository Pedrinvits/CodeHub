import { db } from "@/lib/db";
import { compareSync } from "bcrypt-ts";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import email from "next-auth/providers/email";


export const {
    handlers: { GET, POST },
    auth,
    signIn,
    signOut,
} = NextAuth({
    providers: [
        Credentials({
            credentials: {
                email: {

                },
                password: {

                }
            },
            async authorize(credentials, req) {

                const password = credentials.password as string
                const email = credentials.email as string

                if (!email || !password) {
                    return null;
                }
                // await getUserByEmail(email);
                const user = await db.user.findUnique({
                    where: {
                        email: email
                    }
                })

                if (!user) {
                    return null;
                }

                const matches = compareSync(password, user.password ?? "")

                if (matches) {
                    return { id: user.id, email: user.email, name: user.name, role: user.role }
                }
                return null;
            }
        }),
    ], callbacks: {
        async jwt({ token, user }) {
            user && (token.user = user)
            return token
        },
        async session({ session, token }) {
            session = token.user as any
            return session
        }
    }
});