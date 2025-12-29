export interface MealItem {
    code: String;
    serving: Number;
    product_name_main: String;
}

export type MealType = 'breakfast' | 'lunch' | 'dinner';

export interface MealBasket {
    breakfast: MealItem[];
    lunch: MealItem[];
    dinner: MealItem[];
}