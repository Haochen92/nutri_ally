'use client';
import Image from 'next/image';
import { Button, Collapse, Group, Stack, Table, Text, Title } from '@mantine/core';
import classes from './client.module.css'
import { useDisclosure } from '@mantine/hooks';
import { microNutrients, macroNutrients, getDailyRecommendedIntake } from '@/components/interface/constants';

export default function FoodInfoClient({foodData}) {
    const [opened, {toggle}] = useDisclosure(false);
    const dailyRecommendedIntake = getDailyRecommendedIntake()

    const mapNutrient = (nutrient) => {
      let value, dailyValue;
      const unit = dailyRecommendedIntake[nutrient].unit
      if (foodData[nutrient]) {
        value =  foodData[nutrient] * dailyRecommendedIntake[nutrient].multiplier
        dailyValue = (value / dailyRecommendedIntake[nutrient].value ) * 100
      } else {
        value = 0
        dailyValue = 0
      }
      return [nutrient, `${value.toFixed(1)} ${unit}`, `${dailyValue.toFixed(1)} %`]
    }

    const tableDataMacro = {
      head: ['Nutrition', 'Quantity', 'DV'],
      body:
        macroNutrients.map((nutrient) => mapNutrient(nutrient))
    }

    const tableDataMicro = {
      head: ['Nutrition', 'Quantity', 'DV'],
      body:
        microNutrients.map((nutrient) => mapNutrient(nutrient))
    } 
  
    return (
      <section className="page-shell page-stack">
        <div className={classes.hero}>
          <div className={`${classes.imagePanel} section-card`}>
            <div className={classes.imageFrame}>
              <Image
                src={`/${foodData.image_url}`}
                alt={foodData.product_name_main || "product Image"}
                fill
                className={classes.image}
                sizes="(max-width: 48rem) 100vw, 34rem"
              />
            </div>
          </div>
          <div className={`${classes.summaryPanel} section-card`}>
            <Text className="eyebrow">Food detail</Text>
            <Title className={classes.title}>{foodData.product_name_main}</Title>
            <Text className={classes.copy}>
              Review this product’s nutrient breakdown and compare macro and micro nutrients
              against default daily values before you add it to meals.
            </Text>
            <Stack className={classes.nutriContainer}>
                <Image 
                  src={`/nutri_icon/Nutri-score-${foodData.nutriscore_grade.toUpperCase()}.svg`}
                  width={200}
                  height={100}
                  alt={foodData.nutriscore_grade}
                />
                <Text className={classes.quantity}>{`Serving Size: ${foodData.quantity}`}</Text>
            </Stack>
          </div>
        </div>
        <div className={classes.tableGrid}>
          <div className={`section-card ${classes.tableCard}`}>
            <Group justify='space-between' w='100%'>
              <Title order={3}>Macro nutrients</Title>
            </Group>
            <Table 
              data={tableDataMacro}
              tabularNums 
              striped
              withTableBorder
              horizontalSpacing='xs' 
              verticalSpacing='sm'
            />
          </div>
          <div className={`section-card ${classes.tableCard}`}>
          <Button 
            w='100%' 
            onClick={toggle}
            variant='subtle'
            color='dark'
            className={classes.collapseButton}
          >
            <Title order={3}>Micro nutrients</Title>
          </Button>
          <Collapse in={opened}>
            <Table 
              data={tableDataMicro}
              tabularNums 
              striped
              withTableBorder
              horizontalSpacing='xs' 
              verticalSpacing='sm'
            />
          </Collapse>
          </div>
        </div>
      </section>
    );
  }
  
