'use client';

import MealCard from './_components/MealCard';
import useBasket from '@/hooks/useBasket';
import { Loader, Tabs, Text, Title } from '@mantine/core';
import { IconMilk, IconBowlChopsticks, IconToolsKitchen2 } from '@tabler/icons-react';
import { useState, useEffect } from 'react';
import useNutritionalInfo from '@/hooks/useNutritionalInfo';
import type { MealItem, MealType } from '@/types/domain';
import classes from './client.module.css';

interface MealCartClientProps {
  userId: string | null;
  isLoggedIn: boolean;
}

const mealsConfig: { name: MealType; icon: React.ReactNode }[] = [
  { name: 'breakfast', icon: <IconMilk size={20} /> },
  { name: 'lunch', icon: <IconBowlChopsticks size={20} /> },
  { name: 'dinner', icon: <IconToolsKitchen2 size={20} /> },
];

export default function MealCartClient({ userId, isLoggedIn }: MealCartClientProps) {
  const basket = useBasket();
  const { mealNutrition } = useNutritionalInfo();
  const [mealNutritionData, setMealNutritionData] = useState<Record<MealType, Record<string, number>> | null>(null);

  useEffect(() => {
    if (mealNutrition) {
      setMealNutritionData(mealNutrition);
    }
  }, [mealNutrition]);

  if (!mealNutritionData) {
    return (
      <section className="page-shell">
        <div className={classes.loader}>
          <Loader color="leaf" size={44} />
        </div>
      </section>
    );
  }

  return (
    <section className="page-shell page-stack">
      <div className="page-header">
        <div className="page-heading">
          <Text className="eyebrow">Meal cart</Text>
          <Title className="page-title">Assemble meals before you save or review them</Title>
          <Text className="page-copy">
            Each meal keeps its own list and nutrition total, while the dashboard
            aggregates everything into daily progress.
          </Text>
        </div>
      </div>
      <div className={`section-card ${classes.tabsShell}`}>
        <Tabs defaultValue="breakfast" variant="pills" radius="xl" color="leaf.6">
          <Tabs.List grow>
            {mealsConfig.map((meal) => (
              <Tabs.Tab key={meal.name} value={meal.name} leftSection={meal.icon}>
                {meal.name.charAt(0).toUpperCase() + meal.name.slice(1)}
              </Tabs.Tab>
            ))}
          </Tabs.List>
          {mealsConfig.map((meal) => (
            <Tabs.Panel key={meal.name} value={meal.name} pt="lg">
              <MealCard
                mealType={meal.name}
                foodArray={basket[meal.name]}
                userId={userId}
                mealNutrition={mealNutritionData[meal.name]}
                isLoggedIn={isLoggedIn}
              />
            </Tabs.Panel>
          ))}
        </Tabs>
      </div>
    </section>
  );
}
