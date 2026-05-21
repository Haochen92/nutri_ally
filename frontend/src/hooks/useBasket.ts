'use client';

import { useContext } from 'react';
import BasketContext from '@/context/BasketContext';
import type { BasketContextType } from '@/types/domain';

export default function useBasket(): BasketContextType {
  const context = useContext(BasketContext);
  if (context === null) {
    throw new Error('useBasket must be used within a BasketProvider');
  }
  return context;
}
