
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import { authOptions } from "../api/auth/[...nextauth]/route"
import StatsBoard from "./StatsBoard";
import createClient from "../../scripts/createServerClient";

export default async function StatsPage() {
    const session = await getServerSession(authOptions)
    const supabase = await createClient();

    if (!session) {
        redirect("/")
    }

    console.log(session.user)
    const [listResult, settingsResult, taskResult] = await Promise.all(
        [
            // supabase.from("profiles").select("*").eq("id", session.user.id).single(),
            supabase.from("todo_lists").select("*").eq("owner_id", session.user.id).order("created_at", { ascending: true }),
            supabase.from("user_settings").select("*").eq("user_id", session.user.id),
            supabase.from("todo_tasks").select("*").eq("owner_id", session.user.id)
        ]
    )

    if (listResult.error || settingsResult.error) {
        return <div className="p-6 text-2xl font-black">Error loading your stats.</div>;
    }

    console.log(listResult)
    console.log(settingsResult)
    return (
        <StatsBoard initialList={listResult} initialSettings={settingsResult} initialTasks={taskResult} />
    )
}