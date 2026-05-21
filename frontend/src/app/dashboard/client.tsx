'use client';

import { Button, Loader, Stack, Text, Title } from '@mantine/core';
import Cookies from 'js-cookie';
import useNutritionalInfo from '@/hooks/useNutritionalInfo';
import NutrientIndicator from './_components/NutrientIndicator';
import MacrosChart from './_components/MacrosChart';
import MacroSlider from './_components/MacroSlider';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { getDailyRecommendedIntake } from '@/types/domain/constants';
import type { MacrosTarget, DailyIntake } from '@/types/domain';
import classes from './client.module.css';

interface DashboardProps {
  savedMacros: MacrosTarget | null;
}

export default function Dashboard({ savedMacros }: DashboardProps) {
  const { totalNutrition } = useNutritionalInfo();
  const [showIndicator, setShowIndicator] = useState(false);
  const [dailyValue, setDailyValue] = useState<Partial<DailyIntake>>({});
  const [macrosTarget, setMacrosTarget] = useState<MacrosTarget>(() => {
    return savedMacros ?? { proteins: 0, carbohydrates: 0, fats: 0 };
  });

  useEffect(() => {
    Cookies.set('nutrients-target', JSON.stringify(macrosTarget));
  }, [macrosTarget]);

  useEffect(() => {
    if (totalNutrition) {
      const totalMacrosNutrient =
        totalNutrition.proteins +
        totalNutrition.carbohydrates +
        totalNutrition.fat;

      setShowIndicator(totalMacrosNutrient > 0);
    }
  }, [totalNutrition]);

  useEffect(() => {
    const getDailyValue = getDailyRecommendedIntake({
      userCarbohydrates: macrosTarget.carbohydrates,
      userFat: macrosTarget.fats,
      userProteins: macrosTarget.proteins,
    });
    setDailyValue(getDailyValue);
  }, [macrosTarget]);

  return (
    <section className="page-shell page-stack">
      <div className="page-header">
        <div className="page-heading">
          <Text className="eyebrow">Nutrition dashboard</Text>
          <Title className="page-title">Track what you ate against what you planned</Title>
          <Text className="page-copy">
            Your meal basket feeds directly into these totals. Adjust macro targets,
            then use the nutrient indicators below to spot gaps or overages quickly.
          </Text>
        </div>
        <div className="metric-row">
          {Object.entries(macrosTarget).map(([key, value]) => (
            <Text key={key} className="metric-pill">
              {`${key}: ${value}g`}
            </Text>
          ))}
        </div>
      </div>
      {totalNutrition ? (
        <>
          <div className={classes.topGrid}>
            <div className={`section-card ${classes.analyticsCard}`}>
              <Stack gap="md">
                <Text className={classes.sectionEyebrow}>Consumed today</Text>
                <Title order={3}>Macro balance</Title>
                <MacrosChart nutritionData={totalNutrition} />
              </Stack>
            </div>
            <div className={`section-card ${classes.settingsCard}`}>
              <MacroSlider setData={setMacrosTarget} data={macrosTarget} />
            </div>
          </div>
          {showIndicator ? (
            <div className={classes.indicatorGrid}>
              {Object.entries(totalNutrition).map(([key, value]) => (
                <NutrientIndicator
                  key={key}
                  name={key}
                  current={value as number}
                  dailyValue={dailyValue[key]}
                />
              ))}
            </div>
          ) : (
            <div className={`section-card ${classes.emptyState}`}>
              <Title order={3}>No foods added yet</Title>
              <Text className={classes.emptyCopy}>
                Start in the food gallery, add servings into breakfast, lunch, or dinner,
                and this dashboard will populate automatically.
              </Text>
              <Button component={Link} size="lg" radius="xl" color="leaf.6" href="/gallery">
                Explore foods
              </Button>
            </div>
          )}
        </>
      ) : (
        <Loader color="leaf" size={48} />
      )}
    </section>
  );
}
