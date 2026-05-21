'use client';

import { ReactNode } from 'react';
import { MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { SessionProvider } from 'next-auth/react';
import { BasketProvider } from '@/context/BasketProvider';
import customTheme from '@/theme/index';

interface ProvidersProps {
  children: ReactNode;
}

export default function Providers({ children }: ProvidersProps) {
  return (
    <SessionProvider>
      <MantineProvider
        theme={customTheme}
        defaultColorScheme="light"
      >
        <Notifications />
        <BasketProvider>
          {children}
        </BasketProvider>
      </MantineProvider>
    </SessionProvider>
  );
}
