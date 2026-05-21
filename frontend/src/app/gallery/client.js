'use client';

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import FoodCard from "@/app/gallery/_components/FoodCard";
import SearchBar from "@/app/gallery/_components/SearchBar";
import { Grid, Pagination, Text, Title } from '@mantine/core'
import classes from "./client.module.css";


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
    <section className="page-shell page-stack">
      <div className="page-header">
        <div className="page-heading">
          <Text className="eyebrow">Food gallery</Text>
          <Title className="page-title">Browse foods and add them straight into meals</Title>
          <Text className="page-copy">
            Search by name, sort by nutrient density, and use the same meal actions
            across every card so discovery and planning stay in the same flow.
          </Text>
        </div>
        <div className={classes.pageMeta}>
          <Text inherit>{`Page ${currentPage} of ${Math.max(totalPages, 1)}`}</Text>
        </div>
      </div>
      <div className={`section-card ${classes.toolbarCard}`}>
        <SearchBar/>
      </div>
      <div className={`section-card ${classes.gridShell}`}>
        <Grid gutter='xl'>
          {productListInfo.map((item) => (
            <Grid.Col span={{base: 12, sm:6, md:4, lg:3, xl:2 }} key={item.code}>
                <FoodCard foodData={item}/>
            </Grid.Col>
          ))}
        </Grid>
      </div>
      <div className={classes.paginationBar}>
        <Pagination total={totalPages} value={currentPage} onChange={handlePageChange} radius='xl'/>
      </div>
    </section>
  );
}
