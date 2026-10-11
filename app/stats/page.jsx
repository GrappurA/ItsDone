
import { redirect } from "next/navigation";
import StatsBoard from "./StatsBoard";
import createClient from "../../scripts/createServerClient";

export default async function StatsPage() {
    const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError && authError.name !== "AuthSessionMissingError") throw authError;

    if (!user) {
        redirect("/")
    }

    const [listResult, settingsResult, taskResult] = await Promise.all(
        [
            supabase.from("todo_lists").select("*").eq("owner_id", user.id).order("created_at", { ascending: true }),
            supabase.from("user_settings").select("*").eq("user_id", user.id),
            supabase.from("todo_tasks").select("*").eq("owner_id", user.id).order("created_at", { ascending: false })
        ]
    )

    if (listResult.error || settingsResult.error) {
        return <div className="p-6 text-2xl font-black">Error loading your stats.</div>;
    }

    return (
        <StatsBoard initialList={listResult} initialSettings={settingsResult} initialTasks={taskResult} />
    )
}