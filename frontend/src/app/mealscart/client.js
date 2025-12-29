'use client'

import MealCard from './_components/MealCard';
import { useBasket } from '@/components/utility/hooks';
import { Tabs } from '@mantine/core';
import { IconMilk, IconBowlChopsticks, IconToolsKitchen2 } from '@tabler/icons-react'
import { useState, useEffect } from 'react';
import { useNutritionalInfo } from '@/components/utility/hooks';

export default function MealCartClient({userId, isLoggedIn}) {
    const { breakfast, lunch, dinner } = useBasket();
    const { mealNutrition } = useNutritionalInfo();
    const [ mealNutritionData, setMealNutritionData ] = useState(null);

    const mealsMapping = [
        {name: 'breakfast', data: breakfast, icon: <IconMilk size={24}/>},
        {name: 'lunch', data: lunch, icon: <IconBowlChopsticks size={24}/>},
        {name: 'dinner', data: dinner, icon: <IconToolsKitchen2 size={24}/>}
    ]

    useEffect(() => {
        if (mealNutrition) {
            setMealNutritionData(mealNutrition);
        }
    }, [mealNutrition])

    if (!mealNutritionData) return <div>Loading...</div>

    return(
        <Tabs defaultValue="breakfast" orientation='vertical' 
                align='center' h='100%'>
            <Tabs.List>
                {mealsMapping.map(meal => (
                    <Tabs.Tab 
                        key={meal.name} 
                        value={meal.name}
                        leftSection={meal.icon}
                    >
                        {meal.name.toUpperCase()}
                    </Tabs.Tab>
                ))}
            </Tabs.List>
            {mealsMapping.map((meal) => (
                <Tabs.Panel 
                    key={meal.name} 
                    value={meal.name}
                    h='100%'
                >
                    <MealCard
                        mealType={meal.name}
                        foodArray={meal.data}
                        userId={userId}
                        mealNutrition={mealNutritionData[meal.name]}
                        isLoggedIn={isLoggedIn}
                    />
                </Tabs.Panel>
            ))}
        </Tabs>
    )
}