'use server';

import { ReactNode } from 'react';
import { headers } from 'next/headers';
import { auth } from '@/app/auth';
import NavbarClient from './NavbarClient';

interface NavbarProps {
  children: ReactNode;
}

export default async function Navbar({ children }: NavbarProps) {
  const session = await auth();
  const isLoggedIn = !!session;
  const host = (await headers()).get('host');
  const protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http';
  const origin = `${protocol}://${host}`;

  const imageBlob = await fetch(`${origin}/api/s3?profileId=${session?.user?.id}`)
    .then((res) => res.blob());

  return (
    <NavbarClient authenticated={isLoggedIn} imageBlob={imageBlob}>
      {children}
    </NavbarClient>
  );
}
