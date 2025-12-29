'use client'

import { Slider, Stack, Text, Button, Title } from '@mantine/core'
import { useState } from 'react'

const NutrientSlider = ({label, value, setter}) => {
    return(
        <Stack>
            <Text tt='capitalize'> {label} </Text>
            <Slider 
                value={value} 
                color='lime.7' 
                onChange={setter}
                label={label => `${label}g`}
                min={0}
                max={400}
                />
        </Stack>
    )
}

export default function MacroSlider({data, setData}) {

    return(
        <Stack>
            <Title order={3}> Macros Target Settings </Title>
            {Object.entries(data).map(([key, value]) => (
                <NutrientSlider
                    key={key}
                    label={key}
                    value={value}
                    setter={(newValue) => setData(prev => ({...prev, [key]:newValue}))}
                />
            ))}
        </Stack>
    )
}