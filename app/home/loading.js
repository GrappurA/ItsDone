"use client"

import Image from "next/image";

import UpdatingPopUp from "../ReactComponents/UpdatingPopUp"
import ListAddingForm from "../ReactComponents/ListAddingForm"
import { nerkoOne } from '../fonts/NerkoOne';
import ListElement from "../ReactComponents/ListElement"
import MoreMenu from "../ReactComponents/MoreMenu"
import StarsCounter from "../ReactComponents/StarsCounter"
import StreakCounter from "../ReactComponents/StreakCounter"
import profilePic from "../src/profilepic.png"
import morePic from "../src/more.png"

export default function MainDashboard() {
    return (
        <>
            <header className="select-none w-[100%] ml-auto mr-auto bg-[#9D9695] text-4xl p-2" style={{ borderTop: "solid black 5px", borderBottom: "solid black 5px" }}>
                <div className="flex flex flex-row items-center">

                    <div className="flex items-center transition-transform duration-300 hover:scale-105 cursor-pointer">

                        <div className="w-14 h-14 rounded-full overflow-hidden border border-gray-200 hover:border-[#ffffff]">
                            <Image src={profilePic} width={70} height={70} alt="ProfilePic" loading="eager" />
                        </div>
                        <p className="font-logo text-5xl pl-2"></p>

                    </div>

                    <p className="font-logo text-5xl ml-[20%] transition-transform duration-300 hover:scale-102 cursor-pointer hover:border-white"><u className="decoration-[#D0FFCE] decoration-auto underline-offset-[10px]">ItsDone✔️</u></p>
                </div>
            </header>

            <div className={`bg-[#D0FFCE] p-1 ${nerkoOne.className} select-none h-[72.9vh]`}>
                <div id="CanvasForTasks" className="text-3xl border-black-200 rounded-xl border-4 w-[700px] mt-1 overflow-hidden">
                    <p className="p-1 text-4xl bg-[#fffdce]">Your Lists</p>
                    <hr className="w-[100%] " />

                    <ul className='grid grid-cols-3 gap-1 justify-items-center'>
                        <p className="text-5xl">Loading...</p>
                    </ul>

                </div>
            </div>

            <footer className="select-none bg-[#9D9695] text-center" style={{ borderTop: "solid black 5px", borderBottom: "solid black 5px" }}>
                <p>©ItsDone.com</p>
                <p>31 10 06 active users</p>
                <p className="bg-red-100 w-fit p-1 mb-1 ml-auto mr-auto rounded-xl">Buy me a coffee</p>
                <hr className="w-[0.1px] h-[0.1px]" />
            </footer>
        </>

    )
}