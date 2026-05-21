export interface MealItem {
  code: string;
  serving: number;
  product_name_main: string;
}

export type MealType = 'breakfast' | 'lunch' | 'dinner';

export interface MealBasket {
  breakfast: MealItem[];
  lunch: MealItem[];
  dinner: MealItem[];
}

export interface NutrientInfo {
  value: number;
  unit: string;
  multiplier: number;
}

export interface DailyIntake {
  energy: NutrientInfo;
  proteins: NutrientInfo;
  carbohydrates: NutrientInfo;
  fat: NutrientInfo;
  saturated_fat: NutrientInfo;
  trans_fat: NutrientInfo;
  sugar: NutrientInfo;
  fiber: NutrientInfo;
  sodium: NutrientInfo;
  potassium: NutrientInfo;
  calcium: NutrientInfo;
  iron: NutrientInfo;
  magnesium: NutrientInfo;
  phosphorus: NutrientInfo;
  zinc: NutrientInfo;
  vitamin_c: NutrientInfo;
  vitamin_a: NutrientInfo;
  vitamin_d: NutrientInfo;
  vitamin_b6: NutrientInfo;
  vitamin_b12: NutrientInfo;
  [key: string]: NutrientInfo;
}

export interface NutritionData {
  totalNutrition: Record<string, number>;
  mealNutrition: Record<MealType, Record<string, number>>;
}

export interface BasketContextType {
  addItem: (params: { item: MealItem; meal: MealType }) => void;
  updateItem: (params: { item: MealItem; meal: MealType }) => void;
  removeItem: (params: { item: MealItem; meal: MealType }) => void;
  breakfast: MealItem[];
  lunch: MealItem[];
  dinner: MealItem[];
  basket: MealBasket;
}

export interface FoodItem {
  code: string;
  product_name_main: string;
  image_url: string;
  energy: number;
  proteins: number;
  carbohydrates: number;
  fat: number;
  nutriscore_grade: string;
  nutriscore_score: number;
  nova_group: number;
  serving_size: string;
  quantity: string;
  [key: string]: string | number;
}

export interface UserProfile {
  gender: string;
  birthday: string;
  height: number;
  weight: number;
  username: string;
}
