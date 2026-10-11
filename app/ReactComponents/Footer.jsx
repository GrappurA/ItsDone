"use client";
import { useEffect, useState } from "react";
import createSupabaseBrowserClient from "../../scripts/createBrowserClient";

export default function Footer() {
    const supabase = createSupabaseBrowserClient();
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setIsAuthenticated(Boolean(session?.user));
        });

        supabase.auth.getUser().then(({ data: { user }, error }) => {
            if (error && error.name !== "AuthSessionMissingError") {
                console.error("Error loading current user for footer:", error);
                return;
            }
            setIsAuthenticated(Boolean(user));
        }).catch((error) => {
            console.error("Error loading current user for footer:", error);
        });

        return () => subscription.unsubscribe();
    }, [supabase]);

    if (!isAuthenticated) return null;

    return (
        <footer className="select-none bg-[#9D9695] text-center border-t-4" style={{ borderTop: "solid black 5px" }}>
            <p>©ItsDone.com</p>
            <p>31 10 06 active users</p>
            <p className="bg-red-100 w-fit p-1 mb-1 ml-auto mr-auto rounded-xl">Buy me a coffee</p>
            <hr className="w-[0.1px] h-[0.1px]" />
        </footer>
    );
}
