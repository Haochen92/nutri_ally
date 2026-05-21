import type { DailyIntake } from './index';

export const macroNutrients = [
  'energy', 'proteins', 'carbohydrates',
  'fat', 'saturated_fat', 'trans_fat', 'sugar', 'fiber',
] as const;

export const microNutrients = [
  'sodium', 'potassium', 'calcium', 'iron',
  'magnesium', 'phosphorus', 'zinc', 'vitamin_c', 'vitamin_a', 'vitamin_d',
  'vitamin_b6', 'vitamin_b12',
] as const;

export type MacroNutrient = typeof macroNutrients[number];
export type MicroNutrient = typeof microNutrients[number];

interface EnergyParams {
  gender: string;
  weight: number;
  height: number;
  age: number;
  activityLevel: number;
}

const calculateEnergy = ({ gender, weight, height, age, activityLevel }: EnergyParams): number => {
  let BMR: number;

  if (gender === 'male') {
    BMR = (10 * weight) + (6.25 * height) - (5 * age) + 5;
  } else {
    BMR = (10 * weight) + (6.25 * height) - (5 * age) - 161;
  }

  return BMR * activityLevel;
};

interface DailyIntakeParams {
  userAge?: number;
  userHeight?: number;
  userActivityLevel?: number;
  userGender?: string;
  userWeight?: number;
  userCarbohydrates?: number;
  userFat?: number;
  userProteins?: number;
}

export const getDailyRecommendedIntake = ({
  userAge = 30,
  userHeight = 170,
  userActivityLevel = 1.2,
  userGender = 'male',
  userWeight = 64,
  userCarbohydrates = 0,
  userFat = 0,
  userProteins = 0,
}: DailyIntakeParams = {}): DailyIntake => {
  const proteins = userProteins ? userProteins : userWeight * 0.8;
  let energy: number, fat: number, carbohydrates: number;

  if (userFat && userCarbohydrates) {
    energy = proteins * 4 + userFat * 9 + userCarbohydrates * 4;
    carbohydrates = userCarbohydrates;
    fat = userFat;
  } else {
    energy = calculateEnergy({
      gender: userGender,
      weight: userWeight,
      height: userHeight,
      age: userAge,
      activityLevel: userActivityLevel,
    });
    const energyWithoutProtein = energy - userProteins * 4;
    carbohydrates = (energyWithoutProtein * 0.7) / 4;
    fat = (energyWithoutProtein * 0.3) / 4;
  }

  return {
    energy: { value: energy, unit: 'kcal', multiplier: 1 },
    proteins: { value: proteins, unit: 'g', multiplier: 1 },
    carbohydrates: { value: carbohydrates, unit: 'g', multiplier: 1 },
    fat: { value: fat, unit: 'g', multiplier: 1 },
    saturated_fat: { value: (energy * 0.10) / 9, unit: 'g', multiplier: 1 },
    trans_fat: { value: 0, unit: 'g', multiplier: 1 },
    sugar: { value: 50, unit: 'g', multiplier: 1 },
    fiber: { value: 20, unit: 'g', multiplier: 1 },
    sodium: { value: 2000, unit: 'mg', multiplier: 1000 },
    potassium: { value: 3500, unit: 'mg', multiplier: 1000 },
    calcium: { value: 800, unit: 'mg', multiplier: 1000 },
    iron: { value: userGender === 'male' ? 8 : 18, unit: 'mg', multiplier: 1000 },
    magnesium: { value: userGender === 'male' ? 350 : 280, unit: 'mg', multiplier: 1000 },
    phosphorus: { value: 700, unit: 'mg', multiplier: 1000 },
    zinc: { value: userGender === 'male' ? 11 : 8, unit: 'mg', multiplier: 1000 },
    vitamin_c: { value: userGender === 'male' ? 105 : 85, unit: 'mg', multiplier: 1000 },
    vitamin_a: { value: 750, unit: 'µg', multiplier: 1000000 },
    vitamin_d: { value: 2.5, unit: 'µg', multiplier: 1000000 },
    vitamin_b6: { value: 1.3, unit: 'mg', multiplier: 1000 },
    vitamin_b12: { value: 2.4, unit: 'µg', multiplier: 1000000 },
  };
};
