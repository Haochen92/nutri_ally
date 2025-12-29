import { auth } from "@/app/auth";
import MealCartClient from "./client";

export default async function MealCartPage() {
    const session = await auth();

    const isLoggedIn = !!session; 
    const userId = session?.user?.id || null; 
    
    return <MealCartClient userId={userId} isLoggedIn={isLoggedIn}/>
}