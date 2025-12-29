import { fetchFoodByName } from "../fetch_food_data/actions";

export async function GET(request) {
    try {
        const foodName = request.nextUrl.searchParams.get('query');
        if (!foodName) {
            return new Response(JSON.stringify({ error: "Missing 'foodName' field in form data" }), {
              status: 400,
              headers: { "Content-Type": "application/json" },
            });
          }
        console.log("foodName", foodName);
        const results = await fetchFoodByName(foodName);
        return new Response(JSON.stringify(results),{
            status: 200,
            headers: { "Content-Type": "application/json" },
        })
    } catch (error) {
        console.error("Error processing form data", error)
        return new Response(JSON.stringify({ error: "Failed to process form data" }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
          });
    }    
}