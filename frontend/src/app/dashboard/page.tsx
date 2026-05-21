import Dashboard from './client';
import { cookies } from 'next/headers';
import type { MacrosTarget } from '@/types/domain';

export default async function DashboardPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get('nutrients-target');
  const parsedToken: MacrosTarget | null = token ? JSON.parse(token.value) : null;

  return <Dashboard savedMacros={parsedToken} />;
}
