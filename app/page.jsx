import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import LoginPage from "./ReactComponents/LoginPage";
import { authOptions } from "./api/auth/[...nextauth]/route";

export default async function redirectPage() {
    const session = await getServerSession(authOptions)
    if (!session) { return (<LoginPage />) }

    redirect("/home")
}