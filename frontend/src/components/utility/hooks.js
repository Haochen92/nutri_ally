import { useContext, useState, useEffect } from 'react';
import BasketContext from '@/components/context/BasketContext';

export const useBasket = () => {
    return useContext(BasketContext)
}

export const useNutritionalInfo = () => {
    const { basket } = useBasket();
    const [ nutritionData, setNutritionData ] = useState({});

    useEffect(() => {
        const fetchNutritionData = async () => {
            const payload = JSON.stringify(basket);
            try {
                const res = await fetch('/api/nutrition', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: payload
                })
    
                if (!res.ok) {
                    throw new Error('Unable to fetch Nutrition Data')
                }
                const data = await res.json();
                setNutritionData({totalNutrition: data.overall, mealNutrition: data.perMeal})
            } catch (error) {
                console.error(error.message)
            }
        }

        fetchNutritionData();    
    }, [basket])
    return nutritionData;
}
