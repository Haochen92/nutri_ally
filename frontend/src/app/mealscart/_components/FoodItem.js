'use client'

import { Group, Stack, Text, ActionIcon, NumberInput, Skeleton } from '@mantine/core';
import useSWR from 'swr';
import { IconX } from '@tabler/icons-react';
import { useBasket } from '@/components/utility/hooks';
import MacrosDisplay from '@/components/shared/MacrosDisplay';
import Link from 'next/link';
import Image from 'next/image';

const fetcher = (url) => fetch(url).then(res => res.json())

export default function FoodItem({itemData, meal}) {
    const { data: nutritionData, isLoading, error } = useSWR(`/api/fetch_food_data?code=${itemData.code}`, fetcher)
    const { removeItem, updateItem } = useBasket();

    if (isLoading) return <div>Loading</div>

    return(
        <Group w='100%' justify='space-between'>
            <Link href={`/gallery/${itemData.code}`}>
                <Image
                    style={{borderRadius:'8px'}}
                    src={`/${nutritionData.image_url}`} 
                    alt={ nutritionData.product_name_main || "product Image"}
                    width={60}
                    height={60}
                />
            </Link>
            <Stack style={{flex:1}}>
                <Group justify='space-between'>
                    <Text lineClamp={2}>{itemData.product_name_main}</Text>
                    <ActionIcon onClick={() => removeItem({item: itemData, meal: meal})}>
                        <IconX size={24} />
                    </ActionIcon>
                </Group>
                <Group justify='space-between'>
                    <MacrosDisplay data={nutritionData} layout={'flex'} style={{flex:1}}/>
                    <NumberInput
                        value={itemData.serving}
                        suffix="servs"
                        min={.1}
                        decimalScale={1}
                        onChange={() => updateItem({item: itemData, meal: meal})}
                        w='100px'
                    />
                </Group>
                
            </Stack>
        </Group>
    )
}