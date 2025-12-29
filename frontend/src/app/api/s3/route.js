import { uploadImageS3, downloadImageS3 } from "./actions";
import { NextResponse } from "next/server";

export async function POST(req){
    const formData = await req.formData();
    console.log("formData", formData)
    try {
        const id = formData.get("id")
        const file = formData.get("image")
        console.log("id, file", id, file)
        // Upload the file to S3 using the server action
        const fileBuffer = await file.arrayBuffer();
        console.log("Buffer", fileBuffer)
        const imageUrl = await uploadImageS3(id, fileBuffer);
        return new Response(JSON.stringify({ imageUrl }), { status: 200 });
    } catch(error) {
        return new Response(
            JSON.stringify({ error: "Failed to upload image" }),
            { status: 500 }
        );
    }

}

export async function GET(req) {
    /* Download Image */
    const profileId = req.nextUrl.searchParams.get("profileId");

    if (!profileId) {
        return NextResponse.json({error: "Missing profileId"}, {status: 400});
    }

    try {
        const blobObject = await downloadImageS3(profileId);
        return new Response(blobObject, {
            status: 200,
            headers: {
                "Content-Type": "image/jpeg",
                "Content-Length": blobObject.size.toString(),
            }
        })
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
    
}