import NextAuth, { DefaultSession } from "next-auth"

declare module "next-auth" {
    /**
     * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
     */
    interface Session {
        supabaseAccessToken?: string
        user: {
            /** The user's postal id. */
            id: string
            username?: string
        } & DefaultSession["user"]
    }
}

// We also need to tell TypeScript about the JWT token changes!
declare module "next-auth/jwt" {
    interface JWT {
        id: string
        username?: string
        supabaseAccessToken?: string
    }
}