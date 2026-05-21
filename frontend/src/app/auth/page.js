'use client';
import { getProviders} from 'next-auth/react';
import { handleAuth,resendAuth } from '@/app/api/auth/actions';
import { useEffect, useState } from 'react';
import { Button, Flex, Stack, Text, TextInput, Title } from '@mantine/core';
import Image from 'next/image';
import classes from './page.module.css';

export default function SignIn() {
    const [providers, setProviders] = useState(null);

    useEffect(() => {
        async function fetchProviders() {
            const res = await getProviders();
            setProviders(res);
        }
        fetchProviders();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        await resendAuth(formData);
    }

    return (
        <section className="page-shell">
            <Flex className={classes.page}>
                <div className={`${classes.copyPanel} section-card`}>
                    <Text className="eyebrow">Welcome back</Text>
                    <Title className={classes.title}>Sign in to sync meals, targets, and profile details</Title>
                    <Text className={classes.copy}>
                        Authentication unlocks saved meals, avatar uploads, and profile-based nutrition settings.
                        Pick the sign-in method you prefer and continue where you left off.
                    </Text>
                </div>
                <div className={`${classes.formPanel} section-card`}>
                    <Stack gap='lg'>
                        <div>
                            <Text className={classes.panelEyebrow}>Access</Text>
                            <Title order={3}>Choose a sign-in method</Title>
                        </div>
                        {providers && (
                            <ul className={`${classes.ul} list-reset`}>
                                {Object.values(providers).map((provider) => (
                                    provider.name === "Resend" ? (
                                        <li key={provider.name}>
                                            <form className={classes.emailForm} onSubmit={handleSubmit}>
                                                <TextInput  
                                                    type="email" 
                                                    name="email" 
                                                    placeholder="Enter your email" 
                                                    required
                                                    radius='xl'
                                                    size='md'
                                                />
                                                <Button 
                                                    className={classes.button} 
                                                    type="submit" 
                                                    size="md"
                                                    color="leaf.6"
                                                    radius='xl'
                                                >
                                                    Sign in with email
                                                </Button>
                                            </form>
                                        </li>
                                    ) : (
                                        <li key={provider.name}>
                                            <Button
                                                variant="default"
                                                className={classes.button} 
                                                size="md"
                                                color="dark"
                                                radius='xl'
                                                onClick={() => handleAuth(provider.id)}
                                                leftSection={<Image 
                                                                width={24}
                                                                height={24} 
                                                                src={`/auth/icons/${provider.id}-icon.svg`}
                                                                alt={`${provider.id}-icon.svg`}
                                                            />}
                                            >
                                                {`Sign in with ${provider.name}`}
                                            </Button>
                                        </li>
                                    )
                                ))}
                            </ul>
                        )}
                    </Stack>
                </div>
            </Flex>
        </section>
    );
}
