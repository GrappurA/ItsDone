import { useSession } from "next-auth/react";
import { createClient } from "@supabase/supabase-js";
import { useMemo } from "react";

export default function useSupabase() {
    const { data: session } = useSession();

    // useMemo acts as a smart cache. It only rebuilds the Supabase client 
    // IF the user's access token changes (like when they log in or out).
    return useMemo(() => {
        return createClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL,
            process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
            {
                global: {
                    headers: {
                        Authorization: `Bearer ${session?.supabaseAccessToken}`
                    }
                }
            }
        );
    }, [session?.supabaseAccessToken]); // 👈 The trigger
}