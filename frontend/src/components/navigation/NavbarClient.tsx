'use client';

import { ReactNode, useState, useEffect } from 'react';
import { Avatar, AppShell, Button, Group, Menu, Stack, Text } from '@mantine/core';
import { useClickOutside } from '@mantine/hooks';
import Link from 'next/link';
import Image from 'next/image';
import { IconChefHat, IconCarambola, IconLogin2, IconLogout2, IconShoppingCart, IconUser } from '@tabler/icons-react';
import { signOut } from 'next-auth/react';
import { usePathname, useRouter } from 'next/navigation';
import classes from './NavbarClient.module.css';

interface NavbarLinkProps {
  href: string;
  icon: ReactNode;
  label: string;
  active: boolean;
}

function NavbarLink({ href, icon, label, active }: NavbarLinkProps) {
  return (
    <Button
      component={Link}
      href={href}
      leftSection={icon}
      variant={active ? 'filled' : 'subtle'}
      color={active ? 'leaf.6' : 'dark'}
      radius="xl"
      size="md"
      className={active ? classes.navLinkActive : classes.navLink}
    >
      {label}
    </Button>
  );
}

interface NavbarClientProps {
  children: ReactNode;
  authenticated: boolean;
  imageBlob: Blob | null;
}

const ICON_SIZE = 36;

const linkMap = [
  { name: 'Meals Cart', route: '/mealscart', icon: <IconShoppingCart size={ICON_SIZE} /> },
  { name: 'My Nutrition', route: '/dashboard', icon: <IconCarambola size={ICON_SIZE} /> },
  { name: 'Food Gallery', route: '/gallery', icon: <IconChefHat size={ICON_SIZE} /> },
];

export default function NavbarClient({ children, authenticated, imageBlob }: NavbarClientProps) {
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useClickOutside(() => setProfileOpen(false));
  const router = useRouter();
  const pathname = usePathname();
  const [objectUrl, setObjectUrl] = useState('');

  const appSignOut = async () => {
    await signOut({ redirect: false });
    router.refresh();
  };

  useEffect(() => {
    if (imageBlob) {
      const url = URL.createObjectURL(imageBlob);
      setObjectUrl(url);
    }
  }, [imageBlob]);

  return (
    <AppShell header={{ height: 92, offset: true }} padding={0}>
      <AppShell.Header className={classes.header}>
        <Group className={`page-shell ${classes.headerInner}`} wrap="nowrap" justify="space-between" w="100%">
          <Group gap="sm" wrap="nowrap" className={classes.brand}>
            <div className={classes.brandMark}>
              <Image src="/favicon.webp" width={36} height={36} alt="favicon" />
            </div>
            <Stack gap={0} className={classes.brandCopy}>
              <Text className={classes.brandEyebrow}>Nutrition guidance</Text>
              <Text className={classes.brandName}>Nutri Ally</Text>
            </Stack>
          </Group>
          <Group gap="xs" wrap="nowrap" className={classes.links}>
            {linkMap.map((item) => (
              <NavbarLink
                key={item.name}
                label={item.name}
                href={item.route}
                icon={item.icon}
                active={pathname === item.route || pathname.startsWith(`${item.route}/`)}
              />
            ))}
          </Group>
          <Group>
            <Menu opened={profileOpen} onChange={setProfileOpen} position="bottom-end" shadow="md">
              <Menu.Target>
                <Avatar
                  src={imageBlob && objectUrl ? objectUrl : '/default-avatar.svg'}
                  radius="md"
                  alt="my avatar"
                  size={48}
                  onClick={() => setProfileOpen((current) => !current)}
                  className={classes.avatar}
                />
              </Menu.Target>
              <Menu.Dropdown ref={profileRef}>
                <Menu.Label>Profile Settings</Menu.Label>
                {authenticated ? (
                  <Stack>
                    <Menu.Item component={Link} href="/profile" leftSection={<IconUser size={24} />}>
                      Profile Page
                    </Menu.Item>
                    <Menu.Item onClick={appSignOut} leftSection={<IconLogout2 size={24} />}>
                      Sign Out
                    </Menu.Item>
                  </Stack>
                ) : (
                  <Menu.Item component={Link} leftSection={<IconLogin2 size={24} />} href="/auth">
                    Sign In
                  </Menu.Item>
                )}
              </Menu.Dropdown>
            </Menu>
          </Group>
        </Group>
      </AppShell.Header>
      <AppShell.Main className="app-shell-main">
        {children}
      </AppShell.Main>
    </AppShell>
  );
}
