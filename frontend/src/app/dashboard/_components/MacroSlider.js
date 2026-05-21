'use client'

import { Slider, Stack, Text, Title } from '@mantine/core'

const NutrientSlider = ({label, value, setter}) => {
    return(
        <Stack gap={6}>
            <Text tt='capitalize' fw={700}> {label} </Text>
            <Slider 
                value={value} 
                color='leaf.6' 
                onChange={setter}
                label={(sliderValue) => `${sliderValue}g`}
                min={0}
                max={400}
                size='md'
            />
        </Stack>
    )
}

export default function MacroSlider({data, setData}) {

    return(
        <Stack gap='lg'>
            <div>
                <Text className="eyebrow">Target settings</Text>
                <Title order={3}>Macro targets</Title>
            </div>
            <Text c='dimmed'>
                Use these sliders to set the targets that the dashboard compares against.
            </Text>
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
