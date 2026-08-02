"use client"

import MoreMenu from "./MoreMenu"
import StreakCounter from "./StreakCounter"
import StarsCounter from "./StarsCounter"
import Image from "next/image"
import { useSession } from "next-auth/react"
import profilePic from "../src/profilepic.png"
import createBrowserClient from "../../scripts/createBrowserClient"
import React, { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function Header(props) {
    const { data: session } = useSession()
    const supabase = createBrowserClient();
    const router = useRouter();

    const [starsCount, setStarsCount] = React.useState(0)

    function HandleProfileClick() {
        router.push("/stats")
    }

    useEffect(() => {
        let myChannel;
        let isMounted = true; // 🚨 Race condition fix applied!

        async function fetchStatsData() {
            if (!session?.user?.id || !session?.supabaseAccessToken) return;

            try {
                const { data, error } = await supabase
                    .from("profiles")
                    .select("*")
                    .eq("id", session.user.id)
                    .single(); // Use single()

                if (!isMounted) return;

                if (data) setStarsCount(data.star_count);

                myChannel = supabase
                    .channel('realtime-profiles')
                    .on(
                        'postgres_changes',
                        { event: 'UPDATE', schema: 'public', table: 'profiles', filter: `id=eq.${session.user.id}` },
                        (payload) => { if (isMounted) setStarsCount(payload.new.star_count); }
                    ).subscribe();
            } catch (error) {
                console.error("error loading header data:", error)
            }
        }
        fetchStatsData()
        return () => {
            isMounted = false;
            if (myChannel) supabase.removeChannel(myChannel)
        }
    }, [session, supabase])

    if (!session) return null;

    return (
        <header className="relative select-none w-full bg-[#9D9695] border-y-4 border-black p-2 md:p-3">

            <div className="flex flex-row items-center justify-between max-w-7xl mx-auto w-full gap-2">

                {/* 1. LEFT SIDE: Profile (z-10 keeps it clickable if they overlap on tiny screens) */}
                <div onClick={HandleProfileClick} className="flex items-center gap-2 md:gap-4 z-10">
                    <div className="transition-transform duration-300 hover:scale-105 cursor-pointer w-10 h-10 md:w-14 md:h-14 rounded-full overflow-hidden border-2 border-black hover:border-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                        <Image src={profilePic} width={70} height={70} alt="ProfilePic" loading="eager" />
                    </div>
                    <p className="hidden md:block transition-transform duration-300 hover:scale-105 cursor-pointer font-logo text-3xl md:text-5xl text-white">
                        {session.user.username}
                    </p>
                </div>

                {/* 2. RIGHT SIDE: Stats + Menu */}
                <div className="flex items-center gap-3 md:gap-6 z-10">
                    {/* Stats moved to the right side next to the menu (Hidden on tablets/mobile) */}
                    <div className="hidden xl:flex gap-4 lg:gap-8">
                        <StarsCounter starsCount={starsCount} />
                        <StreakCounter streakCount={0} />
                    </div>
                    <MoreMenu />
                </div>

            </div>

            {/* 3. DEAD CENTER: The Logo */}
            {/* left-1/2 pushes the left edge to the middle, -translate-x-1/2 pulls it back by exactly half its own width! */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-0 pointer-events-auto">
                <p onClick={() => router.push("/home")} className="font-logo text-3xl md:text-5xl transition-transform duration-300 hover:scale-105 cursor-pointer text-white">
                    <u className="decoration-[#D0FFCE] decoration-4 md:decoration-[6px] underline-offset-[6px] md:underline-offset-[10px]">ItsDone✔️</u>
                </p>
            </div>

        </header >
    )
}