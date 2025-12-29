'use client';

import useSWR, {mutate} from "swr";
import { useState, useEffect } from 'react';
import { useBasket } from "@/components/utility/hooks";
import { Select, Group, ActionIcon, Text } from "@mantine/core";
import { IconTrash, IconPlus } from "@tabler/icons-react";
import MacrosDisplay from "@/components/shared/MacrosDisplay";

const fetcher = (url) => fetch(url).then(res => res.json());

export default function SavedMeals({userId, mealType}) {
    const { data, error, isLoading } = useSWR(`/api/meals?user=${userId}`, fetcher);
    const { addItem } = useBasket();

    if (isLoading) {
        return <div>Loading...</div>
    }

    const handleSelection = async (selectionName) => {

        const selectedMeal = data.find(({meal_name}) => (
            meal_name === selectionName
        ))
        console.log('data', data, typeof data)
        const foodItems = selectedMeal.meal_items;
        console.log('fooditem', foodItems, typeof foodItems)
        foodItems.forEach(item => addItem({item: item, meal: mealType}));
    }

    const handleDelete = async (mealName) => {
        console.log("meal name to be deleted: ", mealName)
        const payload = { userId: userId, mealName: mealName }

        const res = await fetch("/api/meals", {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload)
        })
        if (!res.ok) {
            throw new Error("Meal cannot be deleted")
        }
        // Update with the latest data
        mutate(`/api/meals?user=${userId}`);

    }

    const selectData = data.map((item) =>({
        value: item.meal_name,
        label: item.meal_name,
        macros: item.meal_macros
    }));


    const renderMealOption = ({option, onClick}) => (
        <Group w='100%'>
            <ActionIcon onClick={() => handleSelection(option.value)}>
                <IconPlus size={24}/>
            </ActionIcon>
            <Text> {option.value} </Text>
            <MacrosDisplay data={option.macros} layout='flex'/>
            <ActionIcon onClick={() => handleDelete(option.value)}>
                <IconTrash size={24}/>
            </ActionIcon>
        </Group>
    )

    return(
        <Select
            placeholder="select a meal"
            data={selectData}
            renderOption={renderMealOption}
        />
    )
}