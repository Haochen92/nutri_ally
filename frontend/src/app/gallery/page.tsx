import { fetchProductCount, fetchFoodByPage } from '@/app/api/fetch_food_data/actions';
import FoodListingClient from './client';

interface FoodListingServerProps {
  searchParams: Promise<{
    page?: string;
    order?: string;
    filter?: string;
    search?: string;
  }>;
}

export default async function FoodListingServer({ searchParams }: FoodListingServerProps) {
  const resolvedSearchParams = await searchParams;
  const currentPage = parseInt(resolvedSearchParams?.page || '1', 10);
  const sortOrder = resolvedSearchParams?.order || 'false';
  const filter = resolvedSearchParams?.filter || '';
  const search = resolvedSearchParams?.search || '';
  const productsPerPage = 20;

  const totalProducts = await fetchProductCount(search, filter);
  const totalPages = Math.ceil(totalProducts / productsPerPage);

  const productListInfo = await fetchFoodByPage(
    currentPage,
    productsPerPage,
    search,
    filter,
    sortOrder,
  );

  return (
    <FoodListingClient
      productListInfo={productListInfo}
      totalPages={totalPages}
      currentPage={currentPage}
    />
  );
}
