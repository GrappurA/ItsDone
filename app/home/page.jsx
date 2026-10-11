
import MainDashboard from "./MainDashboard"
import LoginPage from "../ReactComponents/LoginPage"

import createClient from "../../scripts/createServerClient";
export default async function HomePage() {
  const supabase = await createClient();
  const { data: { user }, error: authError } = await supabase.auth.getUser();
  if (authError && authError.name !== "AuthSessionMissingError") throw authError;

  if (!user) {
    return (<LoginPage />)
  }

  const { data: initialLists, error } = await supabase
    .from("todo_lists")
    .select(`*,
       todo_tasks(id, list_id, owner_id, title, status)`)
    .eq("owner_id", user.id)
    .order("created_at", { ascending: false })

  if (error) {
    return (<p className="text-3xl">Error loading your lists</p>)
  }

  return (
    <>
      <MainDashboard initialLists={initialLists || []} user={user} />
    </>
  )

}