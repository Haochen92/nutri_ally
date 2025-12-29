'use client';

import Link from "next/link";
import Image from "next/image";
import { Stack, Group, Title, NumberInput, ActionIcon, Tooltip } from '@mantine/core'
import { useBasket } from "@/components/utility/hooks";
import { IconMilk, IconBowlChopsticks, IconToolsKitchen2 } from "@tabler/icons-react";
import { useState } from 'react';
import { notifications } from "@mantine/notifications";
import classes from './FoodCard.module.css';
import MacrosDisplay from "@/components/shared/MacrosDisplay";


export default function FoodCard({foodData}) {

    const [serving, setServing] = useState(1);
    const { addItem, updateItem, basket } = useBasket();

    const mealTypes = [
        {'name': 'breakfast', 'icon': <IconMilk size={24}/>},
        {'name': 'lunch', 'icon': <IconBowlChopsticks size={24}/>},
        {'name': 'dinner', 'icon': <IconToolsKitchen2 size={24}/>}
    ]

    const handleClick = (mealType) => {
        const foodItems = basket[mealType];
        // Find the food item with a matching code
        const foundFoodItem = foodItems.find((item) => item.code === foodData.code);

        if (foundFoodItem) {
        // If the item exists, update it by adding the servings
        updateItem({
            item: {
            code: foodData.code,
            serving: foundFoodItem.serving + serving, 
            product_name_main: foodData.product_name_main,
            },
            meal: mealType,
        });
        } else {
        // Otherwise, add the item with the current serving value
        addItem({
            item: { 
            code: foodData.code, 
            serving: serving, 
            product_name_main: foodData.product_name_main,
            },
            meal: mealType,
        });
        }
        setServing(1);
        notifications.show({message: `meal successfully added to ${mealType}`})
    }
    return(
        <Stack align='center' justify="center" className={classes.main} miw={240} maw={300}>
            <Link href={`/gallery/${foodData.code}`}>
                <Image className={classes.image} 
                    src={`/${foodData.image_url}`} 
                    alt={foodData.product_name_main || "product Image"}
                    width={140}
                    height={140}
                />
            </Link>
            <Stack style={{alignItems:"center", justifyContent:"center"}}>
                <Title size={12} lineClamp={1}>{foodData.product_name_main}</Title>
                <MacrosDisplay data={foodData}/>
                <Stack align='center'>
                    <NumberInput
                        allowNegative={false}
                        max={10}
                        placeholder='serving size'
                        value={serving}
                        onChange={setServing}
                        size='xs'
                        w='100%'
                        decimalScale={1}
                    />
                    <Group justify='space-between' w='100%'>
                        {mealTypes.map((item, index) => (
                            <Tooltip key={index} label={`Add to ${item.name}`}>
                                <ActionIcon variant='default' onClick={() => handleClick(`${item.name}`)}>
                                    {item.icon}
                                </ActionIcon>
                            </Tooltip>
                        ))}
                    </Group>
                </Stack>
            </Stack>
        </Stack>
    )
}