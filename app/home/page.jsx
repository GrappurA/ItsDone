
import MainDashboard from "./MainDashboard"
import LoginPage from "../ReactComponents/LoginPage"

import { authOptions } from "../api/auth/[...nextauth]/route";
import createClient from "../../scripts/createServerClient";
import { getServerSession } from "next-auth"

export default async function HomePage() {
  const session = await getServerSession(authOptions)
  const supabase = await createClient();

  if (!session?.user.id) {
    return (<LoginPage />)
  }

  const { data: initialLists, error } = await supabase
    .from("todo_lists")
    .select(`*,
       todo_tasks(id, list_id, owner_id, title, status)`)
    .eq("owner_id", session.user.id)
    .order("created_at", { ascending: true })

  console.log(initialLists)
  if (error) {
    return (<p className="text-3xl">Error loading your lists</p>)
  }

  return (
    <>
      <MainDashboard initialLists={initialLists || []} session={session} />
    </>
  )

}