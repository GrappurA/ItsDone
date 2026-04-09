"use client"

import MoreMenu from "./MoreMenu"
import StreakCounter from "./StreakCounter"
import StarsCounter from "./StarsCounter"
import Image from "next/image"
import { useSession } from "next-auth/react"


export default function Header() {
    const { data: session } = useSession()
    if (session) {
        return (
            <footer className="select-none bg-[#9D9695] text-center" style={{ borderTop: "solid black 5px", borderBottom: "solid black 5px" }}>
                <p>©ItsDone.com</p>
                <p>31 10 06 active users</p>
                <p className="bg-red-100 w-fit p-1 mb-1 ml-auto mr-auto rounded-xl">Buy me a coffee</p>
                <hr className="w-[0.1px] h-[0.1px]" />
            </footer>
        )
    }
    else {
        return null
    }

}