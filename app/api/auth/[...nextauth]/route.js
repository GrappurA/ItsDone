import NextAuth from "next-auth"
import { SupabaseAdapter } from "@auth/supabase-adapter"
import CredentialsProvider from "next-auth/providers/credentials"

export const authOptions = {
    session: {
        strategy: "jwt"
    },

    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                username: { label: "Username", type: "text" },
                password: { label: "Password", type: "text" }
            },

            async authorize(credentials) {
                //supabase query here

                if (credentials.username == "nika" && credentials.password == "123") {
                    return { id: "1", name: "Nika" }
                }
                else {
                    return null
                }
            }
        })
    ],

    pages: {
        signIn: "/"
    },

    adapter: SupabaseAdapter({
        url: process.env.NEXT_PUBLIC_SUPABASE_URL, secret: process.env.SUPABASE_SERVICE_ROLE_KEY
    }),

    callbacks: {
        async jwt({ token, user }) {
            if (user)
                token.id = user.id
            return token;
        },

        async session({ session, token }) {
            if (session.user)
                session.user.id = token.id
            return session;
        }

    },
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }