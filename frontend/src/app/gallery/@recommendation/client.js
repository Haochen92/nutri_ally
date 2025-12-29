'use client';

import { Carousel } from "@mantine/carousel";
import { Stack, Title } from "@mantine/core";
import Image from "next/image";
import Link from "next/link";
import { IconArrowRight, IconArrowLeft} from '@tabler/icons-react';
import FoodCard from "@/app/gallery/_components/FoodCard";
import classes from './client.module.css'

export default function RecommendationClient({foodData}) {
    return(
        <Stack className={classes.main}>
            <Title>Intelligent Food Recommendations for You</Title>
            <Carousel 
                slideSize="20%" 
                withIndicators 
                slideGap="md"
                align='start'
                justify='center'
                w='100%'
                controlsOffset="md"
                slidesToScroll={2}
                previousControlIcon={<IconArrowLeft size={48}/>}
                nextControlIcon={<IconArrowRight size={48}/>}
            >
            {foodData.slice(0, 20).map((item, index) => (
                <Carousel.Slide key={index} p='md'>
                    <FoodCard foodData={item}/>
                </Carousel.Slide>
            ))}
            </Carousel>
        </Stack> 
    )
}