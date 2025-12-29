import { fetchFoodInfo } from '@/app/api/fetch_food_data/actions';
import FoodInfoClient from './client';

export default async function FoodNutritionalInfo({params}) {
  const foodParams = await params
  const foodData = await fetchFoodInfo(foodParams.food);
  return (
    <FoodInfoClient foodData={foodData}/>
  );
}
