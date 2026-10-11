import { redirect } from "next/navigation";
import LoginPage from "./ReactComponents/LoginPage";
import createClient from "../scripts/createServerClient";

export default async function redirectPage() {
    const supabase = await createClient();
    const { data: { user }, error } = await supabase.auth.getUser();
    if (error && error.name !== "AuthSessionMissingError") throw error;
    if (!user) { return (<LoginPage />) }

    redirect("/home")
}