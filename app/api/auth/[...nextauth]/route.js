import NextAuth from "next-auth"
import { SupabaseAdapter } from "@auth/supabase-adapter"
import { createClient } from '@supabase/supabase-js'
import CredentialsProvider from "next-auth/providers/credentials"

export const authOptions = {
    session: {
        strategy: "jwt"
    },

    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "email", type: "text" },
                password: { label: "password", type: "text" }
            },

            async authorize(credentials) {
                const supabase = createClient(
                    process.env.NEXT_PUBLIC_SUPABASE_URL,
                    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
                )

                const { data, error } = await supabase.auth.signInWithPassword({
                    email: credentials.email,
                    password: credentials.password
                })

                if (!data.user || error) {
                    return null
                }

                return {
                    id: data.user.id,
                    email: data.user.email,

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