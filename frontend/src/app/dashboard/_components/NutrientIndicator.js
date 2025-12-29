import { Progress, Text, Title, Group, Stack  } from '@mantine/core'

const NutrientIndicator = ({name, current, dailyValue}) => {
    const unit = dailyValue.unit
    const target = dailyValue.value
    const progressValue = target !== 0 ? (current / target ) * 100 : 0; 
    return (
        <Group bg='lime.1' style={{ borderRadius:'16px'}} p='sm'>
            <Group style={{flex:1, borderRadius:'12px'}} bg='lime.2' p='sm'>
                <Title ta='center' style={{flex:1}}>{current ? current.toFixed(0) : 0}</Title>
                <Text ta='center'style={{flex:1}} wrap='nowrap'> {`/ ${target? target.toFixed(0) : 0} ${unit}`}</Text>
            </Group>
            <Stack style={{flex:3}}>
                <Group justify='space-between'>
                    <Text size='lg' c='dimmed' fw={500} tt='uppercase'>{name}</Text>
                    <Text size='xl' fw={700}>{progressValue.toFixed(0)} % </Text>
                </Group>
                <Progress value={progressValue} color='lime.6'/>
            </Stack>
        </Group>
    ) 
}

export default NutrientIndicator;