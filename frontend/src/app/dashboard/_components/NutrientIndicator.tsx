import { Progress, Group, Text } from '@mantine/core';
import type { NutrientInfo } from '@/types/domain';
import classes from './NutrientIndicator.module.css';

interface NutrientIndicatorProps {
  name: string;
  current: number;
  dailyValue?: NutrientInfo;
}

export default function NutrientIndicator({ name, current, dailyValue }: NutrientIndicatorProps) {
  const unit = dailyValue?.unit || '';
  const target = dailyValue?.value || 0;
  const progressValue = target !== 0 ? (current / target) * 100 : 0;

  return (
    <div className={classes.card}>
      <div className={classes.valueBlock}>
        <Text className={classes.value}>{current ? current.toFixed(0) : 0}</Text>
        <Text className={classes.target}>{`/ ${target ? target.toFixed(0) : 0} ${unit}`}</Text>
      </div>
      <div className={classes.meta}>
        <Group justify="space-between">
          <Text className={classes.label}>{name}</Text>
          <Text className={classes.progressValue}>{progressValue.toFixed(0)} %</Text>
        </Group>
        <Progress value={Math.min(progressValue, 100)} color="leaf.6" radius="xl" size="lg" />
      </div>
    </div>
  );
}
