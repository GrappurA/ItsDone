
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import { authOptions } from "../api/auth/[...nextauth]/route"
import { createClient } from "@supabase/supabase-js";
import StatsBoard from "./StatsBoard";

export default async function StatsPage() {
    const session = await getServerSession(authOptions)
    const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

    if (!session) {
        redirect("/login")
    }

    console.log(session.user)
    const [listResult, settingsResult] = await Promise.all(
        [
            // supabase.from("profiles").select("*").eq("id", session.user.id).single(),
            supabase.from("todo_lists").select("*").eq("owner_id", session.user.id).order("created_at", { ascending: true }),
            supabase.from("user_settings").select("*").eq("user_id", session.user.id)
        ]
    )

    if (listResult.error || settingsResult.error) {
        return <div className="p-6 text-2xl font-black">Error loading your stats.</div>;
    }

    console.log(listResult)
    console.log(settingsResult)
    return (
        <StatsBoard initialList={listResult} initialSettings={settingsResult} />
    )

    /*
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

                let formattedListData = listData.map(element => {
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
    */
}