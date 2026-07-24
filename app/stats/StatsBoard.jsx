"use client"

import React, { useEffect } from "react";
import { useSession } from "next-auth/react";
import { data, div } from "motion/react-client";

import { nerkoOne } from '../fonts/NerkoOne';
import LoginPage from "../ReactComponents/LoginPage"
import CircularProgress from "../ReactComponents/CircularSize"
import TasksTab from "../ReactComponents/TasksTab"

import dynamic from "next/dynamic";
const StarProgressChart = dynamic(() => import('../ReactComponents/Plot'),
    {
        loading: () => <p className="text-3xl font-bold">Loading Chart Data...</p>,
        ssr: false
    })

export default function StatsBoard({ initialList, initialSettings, initialTasks }) {
    const [doneThreshold, setDoneThreshold] = React.useState(initialSettings.data[0]?.done_threshold || 0,)
    const [cardOpenId, setCardOpenId] = React.useState(null)

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
            details: <p>Your average completion rate is 85%.</p>
        }
    }


    return (
        <div className={`bg-[#d0ffce] p-2 ${nerkoOne.className} h-[72.9vh] select-none`} >
            <p className="text-[62px] bg-[#fffdce] w-fit border-4 rounded-2xl mb-3 pl-2 pr-2">Your Stats</p>

            <div className="grid grid-cols-2 gap-6">

                <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Card 1: Total Tasks (Blue) */}
                    <div id="1" onClick={(e) => setCardOpenId(e.currentTarget.id)} className="bg-[#cefffd] border-4 border-black rounded-2xl p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-2 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all duration-200">
                        <p className="text-2xl font-bold text-gray-800 border-b-4 border-black pb-2 mb-4">
                            ✅Task Info
                        </p>
                        <p className="text-5xl font-black text-black">
                            Tasks
                        </p>
                    </div>

                    {/* Card 2: Completed (Green) */}
                    <div id="2" onClick={(e) => { setCardOpenId(e.currentTarget?.id) }}
                        className="bg-[#D0FFCE] border-4 border-black rounded-2xl p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-2 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all duration-200">
                        <p className="text-2xl font-bold text-gray-800 border-b-4 border-black pb-2 mb-4">
                            📝List Info
                        </p>
                        <p className="text-5xl font-black text-black">
                            Lists
                        </p>
                    </div>

                    {/* Card 3: Biggest Streak (Pink) */}
                    <div id="3" onClick={(e) => { setCardOpenId(e.currentTarget?.id) }}
                        className="bg-[#F2D7EE] border-4 border-black rounded-2xl p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-2 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all duration-200">
                        <p className="text-2xl font-bold text-gray-800 border-b-4 border-black pb-2 mb-4">
                            🔥Streaks
                        </p>
                        <p className="text-5xl font-black text-black">
                            Streak
                        </p>
                    </div>

                    {/* Card 4: Average Done (Yellow) */}
                    <div id="4" onClick={(e) => { setCardOpenId(e.currentTarget?.id) }}
                        className="bg-[#fffdce] border-4 border-black rounded-2xl p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-2 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all duration-200">
                        <p className="text-2xl font-bold text-gray-800 border-b-4 border-black pb-2 mb-4">
                            📊Avg Completion
                        </p>
                        <p className="text-5xl font-black text-black">
                            done here {cardOpenId}
                        </p>
                    </div>
                </div>

                <div className="w-fit">
                    {<StarProgressChart doneThreshold={doneThreshold} data={initialList.data} />}
                </div>

            </div>

            {cardOpenId &&
                <div className="fixed inset-0 z-30 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4"
                    onClick={() => setCardOpenId(null)}
                >
                    <div
                        className={`w-[900px] min-h-[400px] border-4 border-black rounded-3xl p-4 shadow-2xl relative ${modalContent[cardOpenId].color}`}
                        // 2. CRITICAL: This stops the modal from closing when you click the inside of the card!
                        onClick={(e) => e.stopPropagation()}
                    >

                        {/* 3. Render the Title */}
                        <h2 className="text-6xl font-black border-b-7 border-black pb-4 mb-6">
                            {modalContent[cardOpenId].title}
                        </h2>

                        {/* 4. Render the Details */}
                        <div className="text-3xl">
                            {modalContent[cardOpenId].details}
                        </div>

                        {/* Optional: A close button so the user doesn't HAVE to click the background */}
                        <button
                            onClick={() => setCardOpenId(null)}
                            className="absolute top-4 right-4 w-12 h-12 bg-[#ff4a4a] text-black text-2xl font-black border-4 border-black rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 hover:shadow-[0px_0px_0px_0px_rgba(0,0,0,1)] active:translate-y-1 active:shadow-none transition-all"
                        >
                            X
                        </button>

                    </div>
                </div>
            }

        </div >

    )
}