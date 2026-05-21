import { IconMeat, IconDroplet, IconFlame, IconBread } from '@tabler/icons-react';
import { SimpleGrid, Group, Tooltip, Text } from '@mantine/core';

interface MacrosDisplayProps {
  data: Record<string, number | string>;
  layout?: 'grid' | 'row';
}

const ICON_SIZE = 18;

const macrosConfig = [
  { name: 'energy', key: 'energy', units: 'kcal', icon: <IconFlame color="#cf6a3d" size={ICON_SIZE} /> },
  { name: 'protein', key: 'proteins', units: 'g', icon: <IconMeat color="#4b9068" size={ICON_SIZE} /> },
  { name: 'carbohydrates', key: 'carbohydrates', units: 'g', icon: <IconBread color="#a77533" size={ICON_SIZE} /> },
  { name: 'fats', key: 'fat', units: 'g', icon: <IconDroplet color="#3f87a6" size={ICON_SIZE} /> },
];

export default function MacrosDisplay({ data, layout = 'grid' }: MacrosDisplayProps) {
  const items = macrosConfig.map((item) => (
    <Group key={item.name} gap={8} wrap="nowrap">
      <Tooltip label={item.name}>
        {item.icon}
      </Tooltip>
      <Text size="sm" fw={600}>
        {Number(data[item.key]).toFixed(1)}{item.units}
      </Text>
    </Group>
  ));

  return layout === 'grid' ? (
    <SimpleGrid w="100%" cols={2} spacing="xs" verticalSpacing="xs">
      {items}
    </SimpleGrid>
  ) : (
    <Group gap="sm">
      {items}
    </Group>
  );
}
