// scripts/createBrowserClient.js
import { createBrowserClient } from '@supabase/ssr'

export default function useSupabaseBrowser() {
    return createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    )
}