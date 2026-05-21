'use client'

import { useState, useEffect } from 'react';
import { useElementSize, useClickOutside } from '@mantine/hooks';
import { ActionIcon, Button, Group, Menu, ScrollArea, Stack, Text, TextInput, Title, Tooltip } from '@mantine/core';
import FoodItem from './FoodItem';
import { IconBasketHeart, IconHeartFilled } from '@tabler/icons-react';
import { notifications} from '@mantine/notifications';
import SavedMeals from './SavedMeals';
import MacrosDisplay from '@/components/shared/MacrosDisplay';
import classes from "./MealCard.module.css";

export default function MealCard({mealType, userId, foodArray, mealNutrition, isLoggedIn}) {

    const { ref, height } = useElementSize();
    const [isScrollable, setIsScrollable] = useState(false);
    const [mealName, setMealName] = useState("");
    const [opened, setOpened] = useState(false);
    const clickOutsideRef = useClickOutside(() => setOpened(false));
    const [errorMessage, setErrorMessage] = useState("");

    const macroNutrition = {
        energy: mealNutrition.energy,
        carbohydrates: mealNutrition.carbohydrates,
        fat: mealNutrition.fat,
        proteins: mealNutrition.proteins
    }
    
    const handleSave = async (e) => {
        const payload = {
            userId: userId,
            mealType: mealType,
            mealName: mealName,
            mealItems: foodArray,
            mealNutrition: macroNutrition,
        }
        try {
            const response = await fetch("/api/meals", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            })

            const data = await response.json();

            if (!response.ok){
                throw new Error(data.message)
            }

            notifications.show({
                message: "meal successfully saved",
                position:'bottom-center'
            })
            setErrorMessage("");

        } catch (error) {
            console.error("Unable to upload jsonArray", error)
            setErrorMessage(error.message)
        }

    }

    useEffect(() => {
        height > 400 ? setIsScrollable(true) : setIsScrollable(false);
      }, [height]);
    
    return(
        <Stack className={classes.card}>
            <div className={classes.heading}>
                <Text className={classes.eyebrow}>{mealType}</Text>
                <Title order={2}>{mealType.toUpperCase()}</Title>
            </div>
            <div className={classes.macroCard}>
                <Title order={4}>Meal macros</Title>
                <MacrosDisplay data={mealNutrition} />
            </div>
            <div className={classes.toolbar}>
                <Menu opened={opened} onChange={setOpened} shadow='md' width={520}>
                    <Menu.Target>
                        <Button
                            variant='light'
                            color='leaf.6'
                            leftSection={<IconBasketHeart size={24}/>}
                            w='100%'
                            disabled={!isLoggedIn}
                            radius='xl'
                        >
                            Load saved meal
                        </Button>
                    </Menu.Target>
                    <Menu.Dropdown ref={clickOutsideRef}>
                        <SavedMeals userId={userId} mealType={mealType} />
                    </Menu.Dropdown>
                </Menu>
                <div className={`subtle-card ${classes.itemCount}`}>
                    {`${foodArray.length} item${foodArray.length === 1 ? '' : 's'} in this meal`}
                </div>
            </div>
            <div className={classes.listShell}>
                <ScrollArea h={isScrollable ? 400 : "auto"} type="never" w='100%'>
                    <Stack w='100%' ref={ref} className={classes.listStack}>
                        {foodArray.length > 0 ? foodArray.map((foodData, index) => (
                            <FoodItem key={index} itemData={foodData} meal={mealType}/>
                        )) : (
                            <div className={classes.emptyState}>
                                Add foods from the gallery to start building this meal.
                            </div>
                        )}
                    </Stack>
                </ScrollArea>
            </div>
            <div className={classes.saveRow}>
                <TextInput
                    className={classes.saveInput}
                    placeholder='Enter a meal name'
                    onChange={(e) => setMealName(e.target.value)}
                    error={errorMessage}
                    maxLength={15}
                    radius='xl'
                />
                <Tooltip label={isLoggedIn ? 'Save Meal' : 'Sign In to Save Meal'}>
                    <ActionIcon 
                        disabled={!isLoggedIn || !mealName || foodArray.length === 0}
                        onClick={handleSave}
                        variant='filled'
                        color='leaf.6'
                        radius='xl'
                        size='xl'
                    >
                        <IconHeartFilled size={24} />
                    </ActionIcon>
                </Tooltip>
            </div>
        </Stack>
    )
}
