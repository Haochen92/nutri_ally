import { prisma } from "prisma/prisma";

export async function fetchFoodInfo(code) {
  try {
    const foodData = await prisma.productNutrientsInfo.findUnique({
      where: { code },
    });

    if (!foodData) {
      throw new Error("Food not found");
    }

    return foodData;
  } catch (error) {
    console.error("Error fetching food data:", error);
    throw new Error("Failed to fetch food data");
  }
}

export async function fetchFoodByName(foodName) {
  try {
    const foodData = await prisma.productNutrientsInfo.findMany({
      where: { product_name_main: { contains: foodName, mode: 'insensitive' }},
    });

    if (foodData.length === 0) {
      return false;
    }

    return foodData;
  } catch (error) {
    console.error("Error fetching food data:", error);
    throw new Error("Failed to fetch food data");
  }
}

export async function fetchFoodByPage(pageIndex, productsPerPage, search, filter, sortOrder) {
  const whereClause = {
      product_name_main: {contains: search, mode: 'insensitive'},
      ...(filter ? { [filter]: { gt: 0 } } : {}),
  }

  const orderClause = filter ? {[filter]: sortOrder === 'true' ? 'asc' : 'desc' } : {};
  try {
    const offset = (pageIndex - 1) * productsPerPage;
    const foodData = await prisma.productNutrientsInfo.findMany({
      where: whereClause,
      skip: offset, // Skip records before offset
      take: productsPerPage, // Limit number of products to fetch
      orderBy: orderClause
    })
    if (!foodData || foodData.length === 0) {
      throw new Error("No products found for this page");
    }
    return foodData;

  } catch (error) {
    console.error("Error fetching food data:", error);
    throw new Error("Failed to fetch food data");
  }
}

export async function fetchProductCount(search, filter) {
  //Return the total number of items in database

  const filterCondition = filter ? {[filter]: {gt:0}} : {}; // computed property name for dynamic key filter
  try{
    const count = await prisma.productNutrientsInfo.count({
      where: {
        product_name_main: {contains: search, mode: 'insensitive'},
        ...filterCondition // spread the object
      }
    });
    return count;
  } catch (error) {
    console.error("Error fetching food data:", error);
    throw new Error("Failed to fetch food data");
  }
}
