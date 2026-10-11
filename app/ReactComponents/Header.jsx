"use client"

import MoreMenu from "./MoreMenu"
import StreakCounter from "./StreakCounter"
import StarsCounter from "./StarsCounter"
import Image from "next/image"
import profilePic from "../src/profilepic.png"
import createSupabaseBrowserClient from "../../scripts/createBrowserClient"
import React, { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function Header() {
    const supabase = createSupabaseBrowserClient();
    const router = useRouter();
    const [user, setUser] = React.useState(null)
    const [starsCount, setStarsCount] = React.useState(0)

    function HandleProfileClick() {
        router.push("/stats")
    }

    useEffect(() => {
        let isMounted = true;
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            if (isMounted) setUser(session?.user ?? null)
        })

        supabase.auth.getUser().then(({ data: { user }, error }) => {
            if (error && error.name !== "AuthSessionMissingError") {
                console.error("Error loading current user:", error)
                return
            }
            if (isMounted) setUser(user)
        }).catch((error) => {
            console.error("Error loading current user:", error)
        })

        return () => {
            isMounted = false;
            subscription.unsubscribe()
        }
    }, [supabase])

    useEffect(() => {
        if (!user?.id) return;

        let isMounted = true;
        const myChannel = supabase
            .channel('realtime-profiles')
            .on(
                'postgres_changes',
                { event: 'UPDATE', schema: 'public', table: 'profiles', filter: `id=eq.${user.id}` },
                (payload) => { if (isMounted) setStarsCount(payload.new.star_count); }
            ).subscribe();

        async function fetchStatsData() {
            const { data, error } = await supabase
                .from("profiles")
                .select("star_count")
                .eq("id", user.id)
                .single();

            if (error) {
                console.error("Error loading header data:", error)
                return
            }
            if (isMounted) setStarsCount(data.star_count);
        }

        fetchStatsData()
        return () => {
            isMounted = false;
            supabase.removeChannel(myChannel)
        }
    }, [supabase, user?.id])

    if (!user) return null;

    return (
        <header className="relative select-none w-full bg-[#9D9695] border-b-4 border-black p-2 md:p-3">
            <div className="flex flex-row items-center justify-between max-w-7xl mx-auto w-full gap-2">
                <div className="flex items-center gap-2 md:gap-4 z-10">
                    <div title='Stats' onClick={HandleProfileClick} className="transition-transform duration-300 hover:scale-105 cursor-pointer w-10 h-10 md:w-14 md:h-14 rounded-full overflow-hidden border-2 border-black hover:border-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                        <Image src={profilePic} width={70} height={70} alt="ProfilePic" loading="eager" />
                    </div>
                    <p title='Stats' onClick={HandleProfileClick} className="hidden md:block transition-transform duration-300 hover:scale-105 cursor-pointer font-logo text-3xl md:text-5xl text-white">
                        {user.user_metadata?.username || user.email}
                    </p>
                </div>

                <div className="flex items-center gap-3 md:gap-6 z-10">
                    <div className="hidden xl:flex gap-4 lg:gap-8">
                        <StarsCounter starsCount={starsCount} />
                        <StreakCounter streakCount={0} />
                    </div>
                    <MoreMenu />
                </div>
            </div>

            <div title='Home Page' className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-0 pointer-events-auto">
                <p onClick={() => router.push("/home")} className="font-logo text-3xl md:text-5xl transition-transform duration-300 hover:scale-105 cursor-pointer text-white">
                    <u className="decoration-[#D0FFCE] decoration-4 md:decoration-[6px] underline-offset-[6px] md:underline-offset-[10px]">ItsDone✔️</u>
                </p>
            </div>
        </header>
    )
}
