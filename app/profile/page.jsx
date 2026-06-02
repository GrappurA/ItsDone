"use client"

import useSupabase from "../../scripts/createClient"
import React, { useEffect } from "react";
import { useSession } from "next-auth/react";
import { data, div } from "motion/react-client";
import dynamic from "next/dynamic";
const StarProgressChart = dynamic(() => import('../ReactComponents/Plot'),
    {
        loading: () => <p className="text-3xl font-bold">Loading Chart Data...</p>,
        ssr: false
    })

import { nerkoOne } from '../fonts/NerkoOne';
import LoginPage from "../ReactComponents/LoginPage"
import CircularProgress from "../ReactComponents/CircularSize"

export default function StatsPage() {
    const supabase = useSupabase()
    const { data: session, status } = useSession()

    const [userData, setUserData] = React.useState({
        isLoadingData: true,
        listsData: [],
        doneThreshold: 50,
        plotData: []
    })

    const [dayCount, setDayCount] = React.useState(7)

    useEffect(() => {
        async function fetchStats() {
            if (!session?.user?.id || !session?.supabaseAccessToken || session == undefined) {
                setUserData(prev => ({ ...prev, isLoadingData: false }))
                return
            }
            try {
                setUserData(prev => ({ ...prev, isLoadingData: true }))
                const [listResult, settingsResult] = await Promise.all(
                    [
                        // supabase.from("profiles").select("*").eq("id", session.user.id).single(),
                        supabase.from("todo_lists").select("*").eq("owner_id", session.user.id).order("created_at", { ascending: true }),
                        supabase.from("user_settings").select("*").eq("user_id", session.user.id)
                    ]
                )
                //const { data: profileData, error: profileErr } = profileResult;
                const { data: listData, error: listsError } = listResult
                const { data: settingsData, error: settingsErr } = settingsResult;
                if (settingsErr || listsError) throw settingsErr || listsError;

                //setProfileData(profileData)
                setUserData(prev => ({ ...prev, listsData: listData, doneThreshold: settingsData[0]?.done_threshold }))

                const formattedListData = listData.map(element => {
                    return {
                        created_at: element.created_at,
                        done_percentage: element.done_percentage
                    }
                })

                setUserData(prev => ({ ...prev, plotData: formattedListData }))
            } catch (err) {
                alert(err.message)
                if (err?.message.includes("JWT expired") || err?.code == "PGRST301") {
                    signOut({ callbackUrl: "/" })
                    return
                }
            }
            finally {
                setUserData(prev => ({ ...prev, isLoadingData: true }))
            }
        }
        fetchStats();
    }, [session])

    if (status == "loading") { return (<div className="bg-[#d0ffce] h-[72.9vh] w-full" />) }
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
                    {<StarProgressChart doneThreshold={userData.doneThreshold} data={userData.plotData} setDayCount={setDayCount} />}
                </div>

            </div>
        </div >
    )
}