'use client'

import { Stack, Title, Group, Button, Loader} from '@mantine/core';
import Cookies from 'js-cookie'
import { useNutritionalInfo } from '@/components/utility/hooks';
import NutrientIndicator from './_components/NutrientIndicator';
import MacrosChart from './_components/MacrosChart';
import MacroSlider from './_components/MacroSlider';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { getDailyRecommendedIntake } from '@/components/interface/constants';


export default function Dashboard({savedMacros}) {
    const { totalNutrition } = useNutritionalInfo();
    const [ showIndicator, setShowIndicator ] = useState(false)
    const [ dailyValue, setDailyValue ] = useState({});
    const [macrosTarget, setMacrosTarget] = useState(() => {
        return savedMacros ? savedMacros : { proteins: 0, carbohydrates: 0, fats: 0 };
    });

    useEffect(() => {
        console.log("marosTarget: ", macrosTarget);
        Cookies.set("nutrients-target", JSON.stringify(macrosTarget));
    }, [macrosTarget]);

    useEffect(() => {
        if (totalNutrition) {
            const totalMacrosNutrient = 
                totalNutrition.proteins + 
                totalNutrition.carbohydrates + 
                totalNutrition.fat;
            
            setShowIndicator(totalMacrosNutrient > 0);
        }
       
    }, [totalNutrition])

    useEffect(() => {
        const getDailyValue = getDailyRecommendedIntake({
            userCarbohydrates: macrosTarget.carbohydrates,
            userFat: macrosTarget.fats,
            userProteins: macrosTarget.proteins
        })
        setDailyValue(getDailyValue);
    },[macrosTarget])

    return (
        <Stack align='center' style={{gap:'24px'}}>
            {totalNutrition ? <>
                <Group justify='space-around' w='100%' p='xl'>
                    <MacrosChart nutritionData={totalNutrition}/>
                    <MacroSlider setData={setMacrosTarget} data={macrosTarget}/>
                </Group>
                {showIndicator ? 
                    <Stack w='100%'> 
                        {Object.entries(totalNutrition).map(([key, value]) => (
                            <NutrientIndicator key={key}
                                name={key}
                                current={value}
                                dailyValue={dailyValue[key]}
                            />
                        ))}
                    </Stack> :
                    <Button component={Link} size='xl' href='/gallery'> Click here to add Food</Button>    
                }</> :
                <Loader color='teal' size={48}/>
            }
        </Stack>
    )
}