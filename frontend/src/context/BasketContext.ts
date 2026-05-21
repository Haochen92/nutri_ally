'use client';

import { createContext } from 'react';
import type { BasketContextType } from '@/types/domain';

const BasketContext = createContext<BasketContextType | null>(null);

export default BasketContext;
