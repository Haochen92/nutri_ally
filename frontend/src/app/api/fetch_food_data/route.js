import { NextResponse } from "next/server";
import { fetchFoodInfo } from "./actions";

export async function GET(req) {
    try {
        const productCode = await req.nextUrl.searchParams.get('code');

        if (!productCode) throw new Error ("Invalid product code")

        const data = await fetchFoodInfo(productCode)

        if (data) {
            return NextResponse.json(data)
        } else {
            throw new Error('No valid response')
        }
    } catch (error) {
        const statusCode = error.message.includes("Invalid product code") ? 404 : 500
        return NextResponse.json({message: error.message}, {status: statusCode})
    }
}