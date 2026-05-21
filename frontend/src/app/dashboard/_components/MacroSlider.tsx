'use client';

import { Dispatch, SetStateAction } from 'react';
import { Slider, Stack, Text, Title } from '@mantine/core';
import type { MacrosTarget } from '@/types/domain';

interface NutrientSliderProps {
  label: string;
  value: number;
  setter: (value: number) => void;
}

function NutrientSlider({ label, value, setter }: NutrientSliderProps) {
  return (
    <Stack gap={6}>
      <Text tt="capitalize" fw={700} size="sm">{label}</Text>
      <Slider
        value={value}
        color="leaf.6"
        onChange={setter}
        label={(sliderValue) => `${sliderValue}g`}
        min={0}
        max={400}
        size="sm"
      />
    </Stack>
  );
}

interface MacroSliderProps {
  data: MacrosTarget;
  setData: Dispatch<SetStateAction<MacrosTarget>>;
}

export default function MacroSlider({ data, setData }: MacroSliderProps) {
  return (
    <Stack gap="lg">
      <div>
        <Text className="eyebrow">Target settings</Text>
        <Title order={3}>Macro targets</Title>
      </div>
      <Text c="dimmed">
        Use these sliders to set the targets that the dashboard compares against.
      </Text>
      {Object.entries(data).map(([key, value]) => (
        <NutrientSlider
          key={key}
          label={key}
          value={value}
          setter={(newValue) => setData((prev) => ({ ...prev, [key]: newValue }))}
        />
      ))}
    </Stack>
  );
}
