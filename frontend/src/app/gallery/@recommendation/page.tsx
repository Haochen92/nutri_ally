import RecommendationClient from './client';
import { fetchFoodByName } from '@/app/api/fetch_food_data/actions';

export default async function RecommendationPage() {
  const foodData = await fetchFoodByName('apple');
  if (!foodData) return null;
  return <RecommendationClient foodData={foodData} />;
}
