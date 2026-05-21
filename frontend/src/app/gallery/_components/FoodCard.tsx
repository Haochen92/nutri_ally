'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ActionIcon, Group, NumberInput, Stack, Text, Title, Tooltip } from '@mantine/core';
import useBasket from '@/hooks/useBasket';
import { IconMilk, IconBowlChopsticks, IconToolsKitchen2 } from '@tabler/icons-react';
import { useState } from 'react';
import { notifications } from '@mantine/notifications';
import classes from './FoodCard.module.css';
import MacrosDisplay from '@/components/shared/MacrosDisplay';
import type { FoodItem, MealType } from '@/types/domain';

interface FoodCardProps {
  foodData: FoodItem;
}

const mealTypes: { name: MealType; icon: React.ReactNode }[] = [
  { name: 'breakfast', icon: <IconMilk size={20} /> },
  { name: 'lunch', icon: <IconBowlChopsticks size={20} /> },
  { name: 'dinner', icon: <IconToolsKitchen2 size={20} /> },
];

export default function FoodCard({ foodData }: FoodCardProps) {
  const [serving, setServing] = useState<number | string>(1);
  const { addItem, updateItem, basket } = useBasket();

  const handleClick = (mealType: MealType) => {
    const foodItems = basket[mealType];
    const foundFoodItem = foodItems.find((item) => item.code === foodData.code);
    const servingNum = Number(serving) || 1;

    if (foundFoodItem) {
      updateItem({
        item: {
          code: foodData.code,
          serving: foundFoodItem.serving + servingNum,
          product_name_main: foodData.product_name_main,
        },
        meal: mealType,
      });
    } else {
      addItem({
        item: {
          code: foodData.code,
          serving: servingNum,
          product_name_main: foodData.product_name_main,
        },
        meal: mealType,
      });
    }
    setServing(1);
    notifications.show({ message: `meal successfully added to ${mealType}` });
  };

  return (
    <Stack className={classes.main} h="100%">
      <Link href={`/gallery/${foodData.code}`} className={classes.imageLink}>
        <div className={classes.imageFrame}>
          <Image
            className={classes.image}
            src={`/${foodData.image_url}`}
            alt={foodData.product_name_main || 'product Image'}
            fill
            sizes="(max-width: 48rem) 100vw, 18rem"
          />
        </div>
      </Link>
      <Stack gap="sm" className={classes.content}>
        <Title order={3} className={classes.title} lineClamp={2}>
          {foodData.product_name_main}
        </Title>
        <div className={classes.macroPanel}>
          <MacrosDisplay data={foodData} />
        </div>
        <Group justify="space-between" w="100%" align="center" wrap="nowrap">
          <NumberInput
            allowNegative={false}
            max={10}
            placeholder="Servings"
            value={serving}
            onChange={setServing}
            size="xs"
            w={88}
            decimalScale={1}
            radius="xl"
          />
          <Group gap="xs" wrap="nowrap">
            {mealTypes.map((item) => (
              <Tooltip key={item.name} label={`Add to ${item.name}`}>
                <ActionIcon
                  variant="light"
                  color="leaf.6"
                  radius="xl"
                  size="xl"
                  onClick={() => handleClick(item.name)}
                >
                  {item.icon}
                </ActionIcon>
              </Tooltip>
            ))}
          </Group>
        </Group>
      </Stack>
    </Stack>
  );
}
