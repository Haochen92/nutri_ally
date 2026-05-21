'use client';

import useSWR, { mutate } from 'swr';
import useBasket from '@/hooks/useBasket';
import { Select, Group, ActionIcon, Text } from '@mantine/core';
import { IconTrash, IconPlus } from '@tabler/icons-react';
import MacrosDisplay from '@/components/shared/MacrosDisplay';
import type { MealItem, MealType } from '@/types/domain';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

interface SavedMeal {
  meal_name: string;
  meal_items: MealItem[];
  meal_macros: {
    energy: number;
    proteins: number;
    carbohydrates: number;
    fat: number;
  };
}

interface SavedMealsProps {
  userId: string | null;
  mealType: MealType;
}

export default function SavedMeals({ userId, mealType }: SavedMealsProps) {
  const { data, error, isLoading } = useSWR<SavedMeal[]>(
    `/api/meals?user=${userId}`,
    fetcher,
  );
  const { addItem } = useBasket();

  if (isLoading) return <div>Loading...</div>;
  if (error || !data) return null;

  const handleSelection = (selectionName: string) => {
    const selectedMeal = data.find(({ meal_name }) => meal_name === selectionName);
    if (!selectedMeal) return;
    selectedMeal.meal_items.forEach((item) => addItem({ item, meal: mealType }));
  };

  const handleDelete = async (mealName: string) => {
    const payload = { userId, mealName };
    const res = await fetch('/api/meals', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error('Meal cannot be deleted');
    mutate(`/api/meals?user=${userId}`);
  };

  const selectData = data.map((item) => ({
    value: item.meal_name,
    label: item.meal_name,
    macros: item.meal_macros,
  }));

  const renderMealOption = ({ option }: { option: { value: string; macros?: SavedMeal['meal_macros'] } }) => (
    <Group w="100%">
      <ActionIcon onClick={() => handleSelection(option.value)}>
        <IconPlus size={24} />
      </ActionIcon>
      <Text>{option.value}</Text>
      {option.macros && <MacrosDisplay data={option.macros} layout="row" />}
      <ActionIcon onClick={() => handleDelete(option.value)}>
        <IconTrash size={24} />
      </ActionIcon>
    </Group>
  );

  return (
    <Select
      placeholder="select a meal"
      data={selectData}
      renderOption={renderMealOption}
    />
  );
}
