'use client'
import BasketContext from './BasketContext';
import { useLocalStorage } from '@mantine/hooks';
import { MealItem, MealBasket } from '../interface/meals'

export const BasketProvider = ({children} : {children : React.ReactNode}) => {
    const [basket, setBasket] = useLocalStorage<MealBasket>({
      key: 'mealBasket',
      defaultValue: {breakfast: [], lunch:[], dinner:[]}
    })

    const addItem = ({item, meal} : {item : MealItem, meal: keyof MealBasket}) => {
        setBasket((prev) => ({
          ...prev,
          [meal]: [...prev[meal], item],
        }));
      };

      const updateItem = ({ item, meal }: { item: MealItem; meal: keyof MealBasket }) => {
        console.log("updating items")
        setBasket((prev) => ({
          ...prev,
          [meal]: prev[meal].map((p) =>
            p.code === item.code ? { ...p, serving: item.serving } : p
          ),
        }));
      };
    
      const removeItem = ({ item, meal }: { item: MealItem; meal: keyof MealBasket }) => {
        setBasket((prev) => ({
          ...prev,
          [meal]: prev[meal].filter((p) => p.code !== item.code),
        }));
      };

    return (
        <BasketContext.Provider value={{addItem, removeItem, updateItem, breakfast: basket.breakfast, lunch: basket.lunch, dinner: basket.dinner, basket: basket}}>
            {children}
        </BasketContext.Provider>
    )
}