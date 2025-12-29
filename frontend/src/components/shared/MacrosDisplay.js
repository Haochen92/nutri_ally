import { IconMeat, IconDroplet, IconFlame, IconBread} from "@tabler/icons-react"
import { Stack, SimpleGrid, Group, Tooltip, Text } from '@mantine/core'

export default function MacrosDisplay({data, layout = 'grid'}){

    const iconSize = 16
    const macrosData = [
        {name: 'energy', value: data.energy.toFixed(1), units: 'kcal', icon: <IconFlame color='red' size={iconSize} /> },
        {name: 'protein', value: data.proteins.toFixed(1), units: 'g', icon: <IconMeat color='orange' size={iconSize} /> },
        {name: 'carbohydrates', value: data.carbohydrates.toFixed(1), units: 'g', icon: <IconBread color='brown' size={iconSize} /> },
        {name: 'fats', value: data.fat.toFixed(1), units: 'g', icon: <IconDroplet color='yellow' size={iconSize} /> }
    
    ]

    const DataComponent = macrosData.map(item => (
        <Group key={item.name}>
            <Tooltip label={item.name}>
                {item.icon}
            </Tooltip>
            <Text size="xs">{item.value}{item.units}</Text>
        </Group>
    ))

    return(
        <>
            { layout == 'grid' ? 
            <SimpleGrid w='100%' cols={2}>
                {DataComponent}
            </SimpleGrid> :
            <Group>
                {DataComponent}
            </Group>
            }
        </>
    )
}