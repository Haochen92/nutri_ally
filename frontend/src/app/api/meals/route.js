import { saveMeal, loadMeals, deleteMeal } from "./actions";
import { NextResponse } from "next/server";

export async function GET(request) {
    console.log("Fetching user Meals Data...")
    try {
      const userId = request.nextUrl.searchParams.get('user');
      const res = await loadMeals(userId);
      
      return res.success
        ? NextResponse.json(res.data , { status: 200 })
        : NextResponse.json({ error: "Failed to access server" }, { status: 500 });
    } catch (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function POST(request) {
    try {
      const payload = await request.json();
      
      const { userId, mealType, mealName, mealItems, mealNutrition } = payload;
      
      const res = await saveMeal({ userId, mealType, mealName, mealItems, mealNutrition });
      if (res.success) {
        return NextResponse.json({ message: "Meal saved successfully" }, { status: 200 })
      } else if (res.error === 'duplicate meal') {
        return NextResponse.json({ message: "Meal name already exists" }, { status: 409 })
      } else {
        return NextResponse.json({ message: "Failed to save meal" }, { status: 500 });
      }
    } catch (error) {
      console.error("Upload error at POST handler:", error);
      return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}

export async function DELETE(request) {
    try {
        const payload = await request.json();
        const res = await deleteMeal({ userId: payload.userId, mealName: payload.mealName });
        return res.success
        ? NextResponse.json({ message: "Meal deleted successfully" }, { status: 200 })
        : NextResponse.json({ error: "Failed to delete meal" }, { status: 500 });
    } catch (error) {
        console.error("Deletion error at DELETE handler:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
