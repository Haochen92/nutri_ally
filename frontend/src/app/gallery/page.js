import { fetchProductCount, fetchFoodByPage } from "@/app/api/fetch_food_data/actions";
import FoodListingClient from "./client";

export default async function FoodListingServer({ searchParams }) {

  const resolvedSearchParams = await searchParams;
  const currentPage = parseInt(resolvedSearchParams?.page || "1", 10); // parse as base 10
  const sortOrder = resolvedSearchParams?.order || "false";
  const filter = resolvedSearchParams?.filter || "";
  const search = resolvedSearchParams?.search || "";
  const productsPerPage = 20;
  

  // Fetch total products and calculate total pages
  const totalProducts = await fetchProductCount(search, filter);
  const totalPages = Math.ceil(totalProducts / productsPerPage);

  // Fetch products for the current page
  const productListInfo = await fetchFoodByPage(
                                  currentPage, productsPerPage, 
                                  search, filter, sortOrder
                                );

  return (
    <div>
      <FoodListingClient
        productListInfo={productListInfo}
        totalPages={totalPages}
        currentPage={currentPage}
      />
    </div>
  );
}
