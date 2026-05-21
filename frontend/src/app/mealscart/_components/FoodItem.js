'use client'

import { ActionIcon, Group, NumberInput, Skeleton, Stack, Text } from '@mantine/core';
import useSWR from 'swr';
import { IconX } from '@tabler/icons-react';
import useBasket from '@/hooks/useBasket';
import MacrosDisplay from '@/components/shared/MacrosDisplay';
import Link from 'next/link';
import Image from 'next/image';
import classes from "./FoodItem.module.css";

const fetcher = (url) => fetch(url).then(res => res.json())

export default function FoodItem({itemData, meal}) {
    const { data: nutritionData, isLoading, error } = useSWR(`/api/fetch_food_data?code=${itemData.code}`, fetcher)
    const { removeItem, updateItem } = useBasket();

    if (isLoading) return <Skeleton height={88} radius='xl' />
    if (error || !nutritionData) return null;

    return(
        <Group w='100%' justify='space-between' className={classes.row} wrap='nowrap'>
            <Link href={`/gallery/${itemData.code}`}>
                <Image
                    className={classes.thumb}
                    src={`/${nutritionData.image_url}`} 
                    alt={ nutritionData.product_name_main || "product Image"}
                    width={60}
                    height={60}
                />
            </Link>
            <Stack className={classes.details}>
                <Group justify='space-between'>
                    <Text lineClamp={2} className={classes.title}>{itemData.product_name_main}</Text>
                    <ActionIcon variant='subtle' color='red' onClick={() => removeItem({item: itemData, meal: meal})}>
                        <IconX size={24} />
                    </ActionIcon>
                </Group>
                <Group justify='space-between' className={classes.actions}>
                    <MacrosDisplay data={nutritionData} layout='flex'/>
                    <NumberInput
                        value={itemData.serving}
                        suffix="servs"
                        min={.1}
                        decimalScale={1}
                        onChange={(value) => {
                            const nextServing = typeof value === 'number' ? value : parseFloat(value);
                            if (!Number.isFinite(nextServing)) {
                                return;
                            }
                            updateItem({item: {...itemData, serving: nextServing}, meal: meal});
                        }}
                        w='100px'
                        radius='xl'
                    />
                </Group>
                
            </Stack>
        </Group>
    )
}
