import RecommendationClient from "./client";
import { fetchFoodByName } from "@/app/api/fetch_food_data/actions";


export default async function RecommendationPage() {
    /* to do segment for fetching recommended food */
    const foodData = await fetchFoodByName('apple');

    return <RecommendationClient foodData={foodData}/>
}