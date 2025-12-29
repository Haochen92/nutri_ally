'use client';

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import FoodCard from "@/app/gallery/_components/FoodCard";
import SearchBar from "@/app/gallery/_components/SearchBar";
import { Grid, Stack, Pagination } from '@mantine/core'


export default function FoodListingClient({ productListInfo, totalPages, currentPage }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handlePageChange = (number) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', String(number))
    router.replace(`${pathname}?${params.toString()}`)
  }

  return (
    <Stack align='center' justify="space-around" ml='xl' mr='xl' p='sm'>
      <SearchBar/>
      <Grid gutter='lg' p='lg' breakpoints={{xs:'360px', sm:'480px', md:'720px', lg:'1080px', xl:'1440px'}}>
        {productListInfo.map((item) => (
          <Grid.Col span={{xs: 12, sm:6, md:4, lg:3, xl:2 }} key={item.code}>
              <FoodCard foodData={item}/>
          </Grid.Col>
        ))}
      </Grid>
      <Pagination total={totalPages} value={currentPage} onChange={handlePageChange}/>
    </Stack>
  );
}
