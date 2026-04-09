"use client"

import MoreMenu from "./MoreMenu"
import StreakCounter from "./StreakCounter"
import StarsCounter from "./StarsCounter"
import Image from "next/image"
import { useSession } from "next-auth/react"
import profilePic from "../src/profilepic.png"



export default function Header() {
    const { data: session } = useSession()
    if (session) {
        return (
            <header className="select-none w-[100%] ml-auto mr-auto bg-[#9D9695] text-4xl p-2" style={{ borderTop: "solid black 5px", borderBottom: "solid black 5px" }}>
                <div className="flex flex flex-row items-center">

                    <div className="w-14 h-14 rounded-full overflow-hidden border border-gray-200 transition-transform duration-300 hover:scale-110 cursor-pointer hover:border-white">
                        <Image src={profilePic} width={70} height={70} alt="ProfilePic" loading="eager" />
                    </div>

                    <div className="flex gap-17 ml-15">
                        <StarsCounter starsCount={50} />
                        <StreakCounter streakCount={50} />
                    </div>

                    <p className="font-logo text-5xl ml-[20%]"><u className="decoration-[#D0FFCE] decoration-auto underline-offset-[10px]">ItsDone✔️</u></p>

                    <MoreMenu />
                </div>
            </header>
        )
    }
    else {
        return null
    }

}