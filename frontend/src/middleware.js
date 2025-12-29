import { auth } from "./app/auth";
import { NextResponse } from "next/server";

export default async function middleware(request) {
    const session = await auth();
    console.log("session data", session);
    if (!session) {
        return NextResponse.redirect(new URL("/auth", request.nextUrl.origin)) // use nextUrl for nextjs
    }

}

export const config = {
    matcher: ["/profile" ]
}

