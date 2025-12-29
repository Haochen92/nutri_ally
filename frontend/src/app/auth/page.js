'use client';
import { getProviders} from 'next-auth/react';
import { handleAuth,resendAuth } from '@/app/api/auth/actions';
import { useEffect, useState } from 'react';
import {Flex, Title, TextInput, Button } from '@mantine/core';
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
        <Flex className={classes.page}>
            <Title>Sign In</Title>
            {providers && (
                <ul className={classes.ul}>
                    {Object.values(providers).map((provider) => (
                         provider.name === "Resend" ? (
                            <form key={provider.name} onSubmit={handleSubmit}>
                                <TextInput  
                                    type="email" 
                                    name="email" 
                                    placeholder="Enter your email" 
                                    required
                                />
                                <Button 
                                    variant="outline" 
                                    className={classes.button} 
                                    type="submit" 
                                    size="md"
                                    color="teal"
                                >Sign in through email</Button>
                            </form>
                        ) : (
                            <li key={provider.name} style={{listStyleType: "none"}}>
                                <Button
                                    variant="outline"
                                    className={classes.button} 
                                    size="md"
                                    color="black"
                                    onClick={() => handleAuth(provider.id)}
                                    leftSection={<Image 
                                                    width={24}
                                                    height={24} 
                                                    src={`/auth/icons/${provider.id}-icon.svg`}
                                                    alt={`${provider.id}-icon.svg`}
                                                    style={{position: "relative"}}
                                                />}
                                >
                                    Sign in with {provider.name}
                                </Button>
                            </li>
                        )
                    ))}
                </ul>
            )}
        </Flex>
    );
}
