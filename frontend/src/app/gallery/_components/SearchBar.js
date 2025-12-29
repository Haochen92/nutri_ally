'use client';

import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { useDebouncedCallback } from '@mantine/hooks';
import { Group, Box, TextInput, ActionIcon, Menu, Select } from '@mantine/core';
import { useToggle } from '@mantine/hooks';
import { useState } from 'react';
import { IconSearch, IconFilter, IconArrowsSort, IconPointer } from '@tabler/icons-react';
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
  const [sortValue, setSortValue] = useToggle();
  const [menu, toggleMenu] = useToggle();
  const [filter, setFilter] = useState("")

  const toggleSort = () => {
    setSortValue();
    const params = new URLSearchParams(searchParams);
    params.set('order', sortValue)
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
    toggleMenu();
  }

  return (
    <Group style={{width:'100%', padding: '16px'}}>
        <Box>
          <Menu opened={menu}>
            <Menu.Target>
              <ActionIcon variant='default' onClick={toggleMenu}>
                  <IconFilter size={24}/>
              </ActionIcon>
            </Menu.Target>
            <Menu.Dropdown>
              <Group>
                <Select 
                  onChange={submitFilter}
                  placeholder="Select Nutrients"
                  data={Filters.nutrients}
                  value={filter}
                  clearable
                  searchable
                />
              </Group>
            </Menu.Dropdown>
          </Menu>

        </Box>
        <TextInput
            className={classes.searchBar}
            leftSection={<IconSearch size={24}/>}
            defaultValue={''}
            onChange={handleChange}
            placeholder="Food Name..."
        />
        <ActionIcon variant='default' onClick={toggleSort}>
            <IconArrowsSort size={24}/>
        </ActionIcon>
    </Group>
  );
}



