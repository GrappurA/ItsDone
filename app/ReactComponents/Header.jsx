"use client"

import MoreMenu from "./MoreMenu"
import StreakCounter from "./StreakCounter"
import StarsCounter from "./StarsCounter"
import Image from "next/image"
import { useSession } from "next-auth/react"
import profilePic from "../src/profilepic.png"
import createBrowserClient from "../../scripts/createBrowserClient"
import React, { useEffect } from "react"
import { redirect } from 'next/navigation';

export default function Header(props) {
    const { data: session } = useSession()
    const supabase = createBrowserClient();

    const [starsCount, setStarsCount] = React.useState(0)

    function HandleProfileClick() {
        window.location.replace("/stats");
    }

    useEffect(() => {
        async function fetchStatsData() {
            //checking user
            if (!session?.user?.id || !session?.supabaseAccessToken) {
                return
            }

            try {
                const { data, error } = await supabase
                    .from("profiles")
                    .select("*")
                    .eq("id", session.user.id)

                setStarsCount(data[0].star_count)
            } catch (error) {
                //alert("error loading basic statisctics data:", error)
            }

        }
        fetchStatsData()
    }, [session])

    if (session) {
        return (
            <header className="select-none w-[100%] ml-auto mr-auto bg-[#9D9695] text-4xl p-2" style={{ borderTop: "solid black 5px", borderBottom: "solid black 5px" }}>
                <div className="flex flex flex-row items-center">

                    <div onClick={HandleProfileClick} className="flex items-center transition-transform duration-300 hover:scale-105 cursor-pointer">

                        <div className="w-14 h-14 rounded-full overflow-hidden border border-gray-200 hover:border-[#ffffff]">
                            <Image src={profilePic} width={70} height={70} alt="ProfilePic" loading="eager" />
                        </div>
                        <p className="font-logo text-5xl pl-2">{session.user.username}</p>

                    </div>

                    <div className="flex gap-17 ml-15">
                        <StarsCounter starsCount={starsCount} />
                        <StreakCounter streakCount={50} />
                    </div>

                    <p onClick={() => redirect("/")} className="font-logo text-5xl ml-[20%] transition-transform duration-300 hover:scale-102 cursor-pointer hover:border-white"><u className="decoration-[#D0FFCE] decoration-auto underline-offset-[10px]">ItsDone✔️</u></p>

                    <MoreMenu />
                </div>
            </header>
        )
    }
    else {
        return null
    }

}