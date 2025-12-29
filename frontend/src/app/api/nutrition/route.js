import { NextResponse } from "next/server";
import { fetchFoodInfo } from "../fetch_food_data/actions";
import { microNutrients, macroNutrients } from "@/components/interface/constants";

const nutrients = [...macroNutrients, ...microNutrients];

export async function POST(req) {
  try {
    const userBasket = await req.json();
    // Initialize overall nutrient totals:
    const nutrientTotals = Object.fromEntries(
      nutrients.map((key) => [key, 0])
    );

    // Initialize an object to store totals for each meal:
    const mealNutrients = {};

    // Iterate over each meal in the basket
    for (const [mealName, mealItems] of Object.entries(userBasket)) {
      // Initialize nutrient totals for this meal
      mealNutrients[mealName] = Object.fromEntries(
        nutrients.map((key) => [key, 0])
      );

      // Iterate over each item in the meal
      for (const item of mealItems) {
        // Fetch food information for this item
        const foodInfo = await fetchFoodInfo(item.code);

        // Accumulate nutrient contributions
        nutrients.forEach((nutrient) => {
          const contribution = foodInfo[nutrient] * item.serving;
          nutrientTotals[nutrient] += contribution;
          mealNutrients[mealName][nutrient] += contribution;
        });
      }
    }

    // Return an object that contains both the overall totals and per-meal totals.
    return NextResponse.json({
      overall: nutrientTotals,
      perMeal: mealNutrients,
    });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
