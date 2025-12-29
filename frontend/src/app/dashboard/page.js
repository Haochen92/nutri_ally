import Dashboard from "./client";
import { cookies } from "next/headers";


export default async function DashboardPage() {
    const cookieStore = await cookies()
    const token = cookieStore.get("nutrients-target");
    const parsedToken = token ? JSON.parse(token.value) : null;

    return <Dashboard savedMacros={parsedToken} />
}