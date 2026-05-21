'use client';

import { ReactNode } from 'react';
import BasketContext from './BasketContext';
import { useLocalStorage } from '@mantine/hooks';
import type { MealItem, MealBasket, MealType } from '@/types/domain';

export function BasketProvider({ children }: { children: ReactNode }) {
  const [basket, setBasket] = useLocalStorage<MealBasket>({
    key: 'mealBasket',
    defaultValue: { breakfast: [], lunch: [], dinner: [] },
  });

  const addItem = ({ item, meal }: { item: MealItem; meal: MealType }) => {
    setBasket((prev) => ({
      ...prev,
      [meal]: [...prev[meal], item],
    }));
  };

  const updateItem = ({ item, meal }: { item: MealItem; meal: MealType }) => {
    setBasket((prev) => ({
      ...prev,
      [meal]: prev[meal].map((p) =>
        p.code === item.code ? { ...p, serving: item.serving } : p
      ),
    }));
  };

  const removeItem = ({ item, meal }: { item: MealItem; meal: MealType }) => {
    setBasket((prev) => ({
      ...prev,
      [meal]: prev[meal].filter((p) => p.code !== item.code),
    }));
  };

  return (
    <BasketContext.Provider
      value={{
        addItem,
        removeItem,
        updateItem,
        breakfast: basket.breakfast,
        lunch: basket.lunch,
        dinner: basket.dinner,
        basket,
      }}
    >
      {children}
    </BasketContext.Provider>
  );
}
