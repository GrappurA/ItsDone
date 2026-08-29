"use client"

import { useState } from "react";
import { nerkoOne } from '../fonts/NerkoOne';
import TasksTab from "../ReactComponents/TasksTab"

import dynamic from "next/dynamic";
const StarProgressChart = dynamic(() => import('../ReactComponents/Plot'),
    {
        loading: () => <p className="text-3xl font-bold">Loading Chart Data...</p>,
        ssr: false
    })

export default function StatsBoard({ initialList, initialSettings, initialTasks }) {
    const [doneThreshold, setDoneThreshold] = useState(initialSettings.data[0]?.done_threshold || 0,)
    const [cardOpenId, setCardOpenId] = useState(null)

    const doneTasks = initialList?.data.filter(task => task.is_done === true)
    const avgDonePercentage = ((doneTasks.length / initialTasks?.data.length) * 100).toFixed(2)

    const modalContent = {
        "1": {
            title: "✅ Your Tasks",
            color: "bg-[#cefffd]",
            details: <TasksTab tasks={initialTasks} />
        },
        "2": {
            title: "📝 List Info",
            color: "bg-[#D0FFCE]",
            details: <p>Here is the breakdown of your active lists...</p>
        },
        "3": {
            title: "🔥 Streaks",
            color: "bg-[#F2D7EE]",
            details: <p>Your current streak is 5 days!</p>
        },
        "4": {
            title: "📊 Avg Completion",
            color: "bg-[#fffdce]",
            details: <p>Your average completion rate is {avgDonePercentage}.</p>
        }
    }


    return (
        // 1. RESPONSIVE FIX: Changed `h-` to `min-h-` so it stretches on mobile if content stacks, added md:p-6 for better desktop spacing
        <div className={`bg-[#d0ffce] p-2 md:p-6 ${nerkoOne.className} min-h-[72.9vh] select-none`} >

            {/* Shrink the massive title on mobile */}
            <p className="text-4xl md:text-[62px] bg-[#fffdce] w-fit border-4 border-black rounded-2xl mb-4 md:mb-6 px-4 py-1">
                Your Stats
            </p>

            {/* 2. THE OUTER GRID FIX: 1 column on mobile, 2 columns on extra-large (xl) screens */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 items-start">

                {/* THE CARDS GRID FIX: 1 col on small phones, 2 cols on tablets/desktops */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                    {/* Card 1: Total Tasks (Blue) */}
                    <div id="1" onClick={(e) => setCardOpenId(e.currentTarget.id)} className="bg-[#cefffd] border-4 border-black rounded-2xl p-4 md:p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-2 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all duration-200 cursor-pointer">
                        <p className="text-xl md:text-2xl font-bold text-gray-800 border-b-4 border-black pb-2 mb-4">
                            ✅Task Info
                        </p>
                        <p className="text-4xl md:text-3xl font-black text-black">
                            {initialTasks ? `Overall Tasks: ${initialTasks.data.length}` : "Your Tasks"}
                        </p>
                    </div>

                    {/* Card 2: Completed (Green) */}
                    <div id="2" onClick={(e) => { setCardOpenId(e.currentTarget?.id) }}
                        className="bg-[#D0FFCE] border-4 border-black rounded-2xl p-4 md:p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-2 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all duration-200 cursor-pointer">
                        <p className="text-xl md:text-2xl font-bold text-gray-800 border-b-4 border-black pb-2 mb-4">
                            📝List Info
                        </p>
                        <p className="text-4xl md:text-5xl font-black text-black">
                            Lists
                        </p>
                    </div>

                    {/* Card 3: Biggest Streak (Pink) */}
                    <div id="3" onClick={(e) => { setCardOpenId(e.currentTarget?.id) }}
                        className="bg-[#F2D7EE] border-4 border-black rounded-2xl p-4 md:p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-2 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all duration-200 cursor-pointer">
                        <p className="text-xl md:text-2xl font-bold text-gray-800 border-b-4 border-black pb-2 mb-4">
                            🔥Streaks
                        </p>
                        <p className="text-4xl md:text-5xl font-black text-black">
                            Streak
                        </p>
                    </div>

                    {/* Card 4: Average Done (Yellow) */}
                    <div id="4" onClick={(e) => { setCardOpenId(e.currentTarget?.id) }}
                        className="bg-[#fffdce] border-4 border-black rounded-2xl p-4 md:p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-2 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all duration-200 cursor-pointer">
                        <p className="text-xl md:text-2xl font-bold text-gray-800 border-b-4 border-black pb-2 mb-4">
                            📊Avg Completion
                        </p>
                        <p className="text-4xl md:text-3xl font-black text-black">
                            {initialTasks ? `Average Done: ${avgDonePercentage}%` : `Your average`}
                        </p>
                    </div>
                </div>

                {/* CHART WRAPPER: Removed w-fit so it respects mobile screen width. Added overflow-x-auto in case the chart canvas is wider than the phone. */}
                <div className="w-full max-w-full overflow-x-auto pb-4">
                    {<StarProgressChart doneThreshold={doneThreshold} data={initialList.data} />}
                </div>

            </div>

            {cardOpenId &&
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-2 md:p-4"
                    onClick={() => setCardOpenId(null)}
                >
                    <div
                        // 3. THE MODAL FIX: w-full max-w-[900px] ensures it fits on phones but caps on desktop. max-h-[90dvh] + overflow-y-auto ensures scrollability if text is too long!
                        className={`w-full max-w-[900px] min-h-[300px] md:min-h-[400px] max-h-[90dvh] overflow-y-auto border-4 border-black rounded-3xl p-4 md:p-8 shadow-2xl relative ${modalContent[cardOpenId].color}`}
                        onClick={(e) => e.stopPropagation()}
                    >

                        {/* Title scales down for mobile */}
                        <h2 className="text-4xl md:text-6xl font-black border-b-4 md:border-b-7 border-black pb-4 mb-4 md:mb-6 pr-12">
                            {modalContent[cardOpenId].title}
                        </h2>

                        {/* Details text scales down slightly for readability on phones */}
                        <div className="text-xl md:text-3xl">
                            {modalContent[cardOpenId].details}
                        </div>

                        {/* Adjusted positioning and size for the close button on mobile */}
                        <button
                            onClick={() => setCardOpenId(null)}
                            className="absolute top-4 right-4 md:top-6 md:right-6 w-10 h-10 md:w-12 md:h-12 flex items-center justify-center bg-[#ff4a4a] text-black text-xl md:text-2xl font-black border-4 border-black rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 hover:shadow-[0px_0px_0px_0px_rgba(0,0,0,1)] active:translate-y-1 active:shadow-none transition-all"
                        >
                            X
                        </button>

                    </div>
                </div>
            }

        </div >
    )

}