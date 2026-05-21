import { IconMeat, IconDroplet, IconFlame, IconBread} from "@tabler/icons-react"
import { Stack, SimpleGrid, Group, Tooltip, Text } from '@mantine/core'

export default function MacrosDisplay({data, layout = 'grid'}){

    const iconSize = 16
    const macrosData = [
        {name: 'energy', value: data.energy.toFixed(1), units: 'kcal', icon: <IconFlame color='#cf6a3d' size={iconSize} /> },
        {name: 'protein', value: data.proteins.toFixed(1), units: 'g', icon: <IconMeat color='#4b9068' size={iconSize} /> },
        {name: 'carbohydrates', value: data.carbohydrates.toFixed(1), units: 'g', icon: <IconBread color='#a77533' size={iconSize} /> },
        {name: 'fats', value: data.fat.toFixed(1), units: 'g', icon: <IconDroplet color='#3f87a6' size={iconSize} /> }
    
    ]

    const DataComponent = macrosData.map(item => (
        <Group key={item.name} gap={6} wrap='nowrap'>
            <Tooltip label={item.name}>
                {item.icon}
            </Tooltip>
            <Text size="xs" fw={600}>{item.value}{item.units}</Text>
        </Group>
    ))

    return(
        <>
            { layout === 'grid' ? 
            <SimpleGrid w='100%' cols={2} spacing='xs' verticalSpacing='xs'>
                {DataComponent}
            </SimpleGrid> :
            <Group gap='sm'>
                {DataComponent}
            </Group>
            }
        </>
    )
}
