'use client'

import { useState, useEffect, useRef } from 'react';
import { useDisclosure, useElementSize, useClickOutside } from '@mantine/hooks';
import { Stack, Group, Title, Button, 
    TextInput, ActionIcon, Menu, Tooltip,
    ScrollArea } from '@mantine/core';
import FoodItem from './FoodItem';
import { IconBasketHeart, IconAvocado, IconHeartFilled
} from '@tabler/icons-react';
import { notifications} from '@mantine/notifications';
import { useNutritionalInfo } from '@/components/utility/hooks';
import SavedMeals from './SavedMeals';
import MacrosDisplay from '@/components/shared/MacrosDisplay';
import { setSourceMapsEnabled } from 'process';

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
        <Stack align='center' justify='center' p={24} w='50vw' style={{gap:'24px'}}>
            <Title size='h2'>{mealType.toUpperCase()}</Title>
            <Stack>
                <Title size='h4'>Macros</Title>
                <MacrosDisplay data={mealNutrition} />
            </Stack>
            <Group w='100%'>
                <Menu opened={opened}>
                    <Menu.Target>
                        <Button
                            variant='default'
                            leftSection={<IconBasketHeart size={24}/>}
                            onClick={() => setOpened(true)}
                            w='100%'
                            disabled={!isLoggedIn}
                        >Load Meal</Button>
                    </Menu.Target>
                    <Menu.Dropdown ref={clickOutsideRef} w='500px'>
                        <SavedMeals userId={userId} mealType={mealType} />
                    </Menu.Dropdown>
                </Menu>
            </Group>
            <Group w='100%'>
                <ScrollArea h={isScrollable ? 400 : "auto"} type="never" w='100%'>
                    <Stack w='100%' ref={ref} >
                        {foodArray.length > 0 && foodArray.map((foodData, index) => (
                            <FoodItem key={index} itemData={foodData} meal={mealType}/>
                        ))}
                    </Stack>
                </ScrollArea>
            </Group>
            <Group w='100%'>
                <TextInput style={{flex:1}}
                    placeholder='Enter a meal name'
                    onChange={(e) => setMealName(e.target.value)}
                    error={errorMessage}
                    maxLength={15}
                />
                <Tooltip label={isLoggedIn ? 'Save Meal' : 'Sign In to Save Meal'}>
                    <ActionIcon 
                        disabled={mealName && foodArray.length > 0 ? false : true && !isLoggedIn} 
                        onClick={handleSave}
                    >
                        <IconHeartFilled size={24} />
                    </ActionIcon>
                </Tooltip>
            </Group>
        </Stack>
    )
}