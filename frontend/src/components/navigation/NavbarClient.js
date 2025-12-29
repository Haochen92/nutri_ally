'use client';

import { useState, useEffect } from 'react';
import { NavLink, Group, AppShell, Avatar, Flex, Menu, MenuItem, Stack } from '@mantine/core';
import { useClickOutside } from '@mantine/hooks';
import Link from 'next/link';
import Image from 'next/image';
import { IconShoppingCart, IconCarambola, IconChefHat,
         IconFavicon, IconLogin2, IconLogout2, IconUser } from '@tabler/icons-react';
import { signOut} from "next-auth/react";
import { useRouter } from "next/navigation"

const NavbarLink = ({ href, icon, label }) => {
    return (
        <NavLink
            w='auto'
            component={Link}
            href={href}
            leftSection={icon}
            label={label}
        />
    )            
}

export default function NavbarClient({children, authenticated, imageBlob}) {

    const [ profileOpen, setProfileOpen ] = useState(false)
    const profileRef = useClickOutside(() => setProfileOpen(false))
    const router = useRouter(); // Call useRouter at the top level of the component
    const [objectUrl, setObjectUrl]  = useState("")

    const appSignOut = async () => {
        await signOut({ redirect: false }); 
        router.refresh();
    };

    useEffect(() => {
        if (imageBlob) {
          const objectUrl = URL.createObjectURL(imageBlob);
          setObjectUrl(objectUrl);
        }
      },[imageBlob])

    const iconSize = 36
    const linkMap = [
        {name: 'Meals Cart', route : '/mealscart', icon: <IconShoppingCart size={iconSize}/> },
        {name: 'My Nutrition', route : '/dashboard', icon: <IconCarambola size={iconSize}/> },
        {name: 'Food Gallery', route : '/gallery', icon: <IconChefHat size={iconSize}/> }
    ]

    return(
        <AppShell
            header={{height:'88', offset:true}}
            padding='sm'
        >
            <AppShell.Header>
                <Group 
                    wrap='nowrap' justify='space-between'
                    w='100%' gap='md' p='lg'
                >
                    <Image
                        src='/favicon.webp'
                        width={48}
                        height={48}
                        style={{borderRadius:'24px'}}
                        alt='favicon'
                    />
                    <Group w='auto' justify='space-around'>
                        {linkMap.map((item) => (
                            <NavbarLink 
                                key={item.name}
                                label={item.name}
                                href={item.route}
                                icon={item.icon}
                            />
                        ))}
                    </Group>
                    <Group>
                        <Menu open={profileOpen}>
                            <Menu.Target>
                                <Avatar
                                    src={imageBlob && objectUrl ? objectUrl : '/default-avatar.svg'}
                                    radius='md'
                                    alt='my avatar'
                                    size={48}
                                    onClick={() => setProfileOpen(true)}
                                />
                            </Menu.Target>
                            <Menu.Dropdown ref={profileRef}>
                                <Menu.Label> Profile Settings </Menu.Label>
                                {authenticated ?
                                    <Stack>
                                        <Menu.Item 
                                            component={Link}
                                            href="/profile"
                                            leftSection={<IconUser size={24}/>}
                                        >
                                            Profile Page
                                        </Menu.Item>
                                        <Menu.Item 
                                            onClick={appSignOut}
                                            leftSection={<IconLogout2 size={24}/>}
                                        >
                                            Sign Out
                                        </Menu.Item> 
                                    </Stack> 
                                    :
                                    <Menu.Item component= {Link} 
                                    leftSection={<IconLogin2 size={24} />}
                                    href='/auth'
                                    >
                                        Sign In
                                    </Menu.Item>
                                }
                            </Menu.Dropdown>
                        </Menu>
                    </Group>
                    
                </Group>
            </AppShell.Header>
            <AppShell.Main h='100vh'>
                {children}
            </AppShell.Main>
        </AppShell>
    )
}