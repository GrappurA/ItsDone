import { useSession } from "next-auth/react";
import { createClient } from "@supabase/supabase-js";
import { useMemo } from "react";

export default function useSupabase() {
    const { data: session } = useSession();

    return useMemo(() => {
        return createClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL,
            process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
            {
                global: {
                    headers: {
                        Authorization: `Bearer ${session?.supabaseAccessToken}`
                    }
                },

                auth: {
                    persistSession: false,
                    autoRefreshToken: false,
                    detectSessionInUrl: false
                }
            }
        );
    }, [session?.supabaseAccessToken]);
}   