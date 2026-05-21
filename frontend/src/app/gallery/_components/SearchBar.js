'use client';

import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { useDebouncedCallback } from '@mantine/hooks';
import { ActionIcon, Menu, Select, TextInput } from '@mantine/core';
import { useState } from 'react';
import { IconArrowsSort, IconFilter, IconSearch } from '@tabler/icons-react';
import classes from './SearchBar.module.css'

const Filters = {
  nutrients : ['energy', 'proteins', 'carbohydrates',
      'fat', 'saturated_fat', 'trans_fat', 'sugar', 'fiber',
      'sodium', 'potassium', 'calcium', 'iron', 
      'magnesium', 'phosphorus', 'zinc', 'vitamin_c', 'vitamin_a'
      , 'vitamin_d','vitamin_b6', 'vitamin_b12'
    ]
  }

export default function SearchBar() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [sortValue, setSortValue] = useState(searchParams.get('order') === 'true');
  const [menu, setMenu] = useState(false);
  const [filter, setFilter] = useState(searchParams.get('filter') || "")

  const toggleSort = () => {
    const nextValue = !sortValue;
    setSortValue(nextValue);
    const params = new URLSearchParams(searchParams);
    params.set('order', String(nextValue));
    router.replace(`${pathname}?${params.toString()}`)
  }

  const handleChange = useDebouncedCallback((e) => {
    const params = new URLSearchParams(searchParams);
    const input = e.target.value;

    if (input) {
      params.set('search', input);
      params.set('page', 1)
    } else {
      params.delete('search');
    }

    router.replace(`${pathname}?${params.toString()}`);
  }, 300);

  const submitFilter = (value) => {
    const params = new URLSearchParams(searchParams);
    if (value) {
      params.set('filter', value)
    } else {
      params.delete('filter')
    }
    router.replace(`${pathname}?${params.toString()}`);
    setFilter(value);
    setMenu(false);
  }

  return (
    <div className={classes.toolbar}>
          <Menu opened={menu} onChange={setMenu} shadow='md' width={280}>
            <Menu.Target>
              <ActionIcon
                variant='light'
                color='leaf.6'
                size='xl'
                radius='xl'
                onClick={() => setMenu((current) => !current)}
              >
                  <IconFilter size={24}/>
              </ActionIcon>
            </Menu.Target>
            <Menu.Dropdown>
                <Select 
                  onChange={submitFilter}
                  placeholder="Filter by nutrient"
                  data={Filters.nutrients}
                  value={filter}
                  clearable
                  searchable
                  radius='lg'
                />
            </Menu.Dropdown>
          </Menu>
        <TextInput
            className={classes.searchBar}
            leftSection={<IconSearch size={24}/>}
            defaultValue={searchParams.get('search') || ''}
            onChange={handleChange}
            placeholder="Search by food name"
            radius='xl'
            size='md'
        />
        <ActionIcon
          variant='light'
          color={sortValue ? 'sand.6' : 'leaf.6'}
          size='xl'
          radius='xl'
          onClick={toggleSort}
        >
            <IconArrowsSort size={24}/>
        </ActionIcon>
    </div>
  );
}


