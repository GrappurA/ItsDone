"use client"

import { nerkoOne } from "../fonts/NerkoOne"

export default function MainDashboard() {
    return (
        <>


            <div className={`bg-[#D0FFCE] p-1 ${nerkoOne.className} select-none h-[72.9vh]`}>
                <div id="CanvasForTasks" className="text-3xl border-black-200 rounded-xl border-4 w-[700px] mt-1 overflow-hidden">
                    <p className="p-1 text-4xl bg-[#fffdce]">Your Lists</p>
                    <hr className="w-[100%] " />

                    <ul className='grid grid-cols-3 gap-1 justify-items-center'>
                        <p className="text-5xl">Loading...</p>
                    </ul>

                </div>
            </div>


        </>

    )
}