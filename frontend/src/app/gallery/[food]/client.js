'use client';
import Image from 'next/image';
import { Stack, Title, Table, Collapse, Group, Button } from '@mantine/core';
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
      <Stack className={classes.page}>
          <Image src={`/${foodData.image_url}`}
            alt={foodData.product_name_main || "product Image"}
            width={400}
            height={400}
          />
        <Stack style={{alignItems:"center", justifyContent:"center"}}>
          <Title size={20}>{foodData.product_name_main}</Title>
          <Stack className={classes.nutriContainer}>
              <Image 
                src={`/nutri_icon/Nutri-score-${foodData.nutriscore_grade.toUpperCase()}.svg`}
                width={200}
                height={100}
                alt={foodData.nutriscore_grade}
              />
          <Title size={20}>{`Serving Size: ${foodData.quantity}`}</Title>
          </Stack>
        </Stack>
        <Stack w='100%'>
          <Group style={{justifyContent:'flex-start', width:'100%'}}>
            <Title size='h3'> Macro Nutrients</Title>
          </Group>
          <Table 
            data={tableDataMacro}
            tabularNums 
            striped
            withTableBorder
            horizontalSpacing='xs' 
            verticalSpacing='sm'
            />
        </Stack>
        <Stack w='100%'>
          <Button 
            w='100%' 
            onClick={toggle}
            variant='white'
            style={{justifyContent:'flex-start', 
                    display:'flex',
                    padding:'0px',
                    color:'black'}}
          >
            <Title size='h3'>Micro Nutrients</Title>
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
        </Stack>
      </Stack>
    );
  }
  