import { prisma } from "prisma/prisma";

export async function saveMeal({userId, mealType, mealName, mealItems, mealNutrition}){
    try {
        
        await prisma.savedMeals.create({
            data: {
                userId: userId,
                meal_type: mealType,
                meal_name: mealName,
                meal_items: mealItems, //Prisma automatically converts to json 
                meal_macros: mealNutrition
            }
        })

        return {success: true}

    } catch (error) {
        if (error.code === 'P2002') {
            return {
                success: false,
                error: 'duplicate meal'
            }
        }
        console.log("Failed to save meal", error)
        return {success: false}
    }
}

export async function loadMeals(userId) {
    try {
        const res = await prisma.savedMeals.findMany({
            where: { userId: userId }
        })
        console.log("successfully loaded meals")
        return {success: true, data: res}
    } catch (error) {
        console.log('error loading meals', error);
        return {success: false}
    }
}


export async function deleteMeal({userId, mealName}) {
    try {
        await prisma.savedMeals.delete({
            where: {
                userId_meal_name: {
                    userId: userId,
                    meal_name: mealName,
                }
            }
        })
        return { success: true }

    } catch (error) {
        console.error("unable to delete meal", error)
        return { success: false}
    }
}


