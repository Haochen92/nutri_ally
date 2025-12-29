import { headers } from "next/headers";
import { auth } from "@/app/auth";
import ProfileClient from "./client";

export default async function ProfilePage() {
    const session = await auth();
    const host = (await headers()).get("host")
    const protocol = process.env.NODE_ENV === "production" ? "https" : "http";
    const origin = `${protocol}://${host}`;

    const imageBlob = await fetch(`${origin}/api/s3?profileId=${session.user.id}`)
        .then((res) => res.blob());
    
    console.log("session data", session.user)

    return <ProfileClient 
                id={session.user.id} 
                name={session.user.name} 
                imageBlob={imageBlob}
                gender={session.user.gender}
                birthday={session.user.birthday}
                height={session.user.height}
                weight={session.user.weight}
            />;
}