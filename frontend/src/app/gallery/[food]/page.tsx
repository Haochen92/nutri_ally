import { fetchFoodInfo } from '@/app/api/fetch_food_data/actions';
import FoodInfoClient from './client';

interface FoodDetailPageProps {
  params: Promise<{ food: string }>;
}

export default async function FoodNutritionalInfo({ params }: FoodDetailPageProps) {
  const foodParams = await params;
  const foodData = await fetchFoodInfo(foodParams.food);
  return <FoodInfoClient foodData={foodData} />;
}
