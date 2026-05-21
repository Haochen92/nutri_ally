'use client';

import { useState, useEffect } from 'react';
import useBasket from './useBasket';
import type { NutritionData } from '@/types/domain';

export default function useNutritionalInfo(): Partial<NutritionData> {
  const { basket } = useBasket();
  const [nutritionData, setNutritionData] = useState<Partial<NutritionData>>({});

  useEffect(() => {
    const fetchNutritionData = async () => {
      try {
        const res = await fetch('/api/nutrition', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(basket),
        });

        if (!res.ok) {
          throw new Error('Unable to fetch Nutrition Data');
        }

        const data = await res.json();
        setNutritionData({
          totalNutrition: data.overall,
          mealNutrition: data.perMeal,
        });
      } catch (error) {
        console.error((error as Error).message);
      }
    };

    fetchNutritionData();
  }, [basket]);

  return nutritionData;
}
