"use client"

import { data, div } from "motion/react-client";
import { nerkoOne } from '../fonts/NerkoOne';
import StarProgressChart from '../ReactComponents/Plot'
import LoginPage from "../ReactComponents/LoginPage"
import CircularProgress from "../ReactComponents/CircularSize"

import useSupabase from "../../scripts/createClient"
import React, { useEffect } from "react";
import { useSession } from "next-auth/react";

export default function StatsPage() {
    const supabase = useSupabase()
    const { data: session, status } = useSession()

    const [isLoadingData, setIsLoadingData] = React.useState(true)
    //const [profileData, setProfileData] = React.useState();
    const [listsData, setListsData] = React.useState([])
    const [doneThreshold, setDoneThreshold] = React.useState(0)
    let plotData = [];
    //const cachedStats = localStorage.setItem("my_cached_stats")

    useEffect(() => {
        async function fetchStats() {
            if (!session?.user?.id || !session?.supabaseAccessToken || session == undefined) {
                setIsLoadingData(false)
                return
            }
            try {
                setIsLoadingData(true)
                const [listResult, settingsResult] = await Promise.all(
                    [
                        // supabase.from("profiles").select("*").eq("id", session.user.id).single(),
                        supabase.from("todo_lists").select("*").eq("owner_id", session.user.id),
                        supabase.from("user_settings").select("*").eq("user_id", session.user.id)
                    ]
                )
                //const { data: profileData, error: profileErr } = profileResult;
                const { data: listData, error: listsError } = listResult
                const { data: settingsData, error: settingsErr } = settingsResult;
                if (settingsErr || listsError) throw settingsErr || listsError;

                //setProfileData(profileData)
                setDoneThreshold(settingsData[0]?.done_threshold)
                setListsData(listData)

                listData.forEach(element => {
                    const { created_at, done_percentage } = element
                    const date = new Date(created_at).toWellFormed()
                    plotData.push(data.created_at)
                })
                alert(plotData)
            } catch (err) {
                alert(err.message)
            }
            finally {
                setIsLoadingData(false)
            }
        }
        fetchStats();
    }, [session])

    if (status == "loading") { return (<CircularProgress />) }
    if (!session) { return (< LoginPage />) }

    return (
        <div className={`bg-[#d0ffce] p-2 ${nerkoOne.className} h-[72.9vh]`} >
            <p className="text-[62px] bg-[#fffdce] w-fit border-4 rounded-2xl mb-3 pl-2 pr-2">Your Stats</p>

            <div className="grid grid-cols-2 gap-6">

                <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Card 1: Total Tasks (Blue) */}
                    <div className="bg-[#cefffd] border-4 border-black rounded-2xl p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-2 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all duration-200">
                        <p className="text-2xl font-bold text-gray-800 border-b-4 border-black pb-2 mb-4">
                            📝Total Tasks
                        </p>
                        <p className="text-5xl font-black text-black">
                            total tasks
                        </p>
                    </div>

                    {/* Card 2: Completed (Green) */}
                    <div className="bg-[#D0FFCE] border-4 border-black rounded-2xl p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-2 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all duration-200">
                        <p className="text-2xl font-bold text-gray-800 border-b-4 border-black pb-2 mb-4">
                            ✅Completed
                        </p>
                        <p className="text-5xl font-black text-black">
                            completed
                        </p>
                    </div>

                    {/* Card 3: Biggest Streak (Pink) */}
                    <div className="bg-[#F2D7EE] border-4 border-black rounded-2xl p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-2 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all duration-200">
                        <p className="text-2xl font-bold text-gray-800 border-b-4 border-black pb-2 mb-4">
                            🔥Biggest Streak
                        </p>
                        <p className="text-5xl font-black text-black">
                            lists here
                        </p>
                    </div>

                    {/* Card 4: Average Done (Yellow) */}
                    <div className="bg-[#fffdce] border-4 border-black rounded-2xl p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-2 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all duration-200">
                        <p className="text-2xl font-bold text-gray-800 border-b-4 border-black pb-2 mb-4">
                            📊Avg Completion
                        </p>
                        <p className="text-5xl font-black text-black">
                            done here
                        </p>
                    </div>
                </div>

                <div className="w-fit">
                    {
                        <StarProgressChart doneThreshold={doneThreshold} data={plotData} />
                    }
                </div>
            </div>
        </div >
    )
}