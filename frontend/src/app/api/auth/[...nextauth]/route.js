import { handlers } from "@/app/auth";

export const { GET, POST } = handlers;


// export async function middleware(req) {
//    // Log incoming request URL and headers
//    console.log("Incoming Request:");
//    console.log("URL:", req.url);
//    console.log("Headers:");
//    console.log("Host:", req.headers.get("host"));
//    console.log("X-Forwarded-Proto:", req.headers.get("x-forwarded-proto"));
//    console.log("Body:", await req.text());

//    return NextResponse.next();
// }
