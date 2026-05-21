'use client';

import { Carousel } from "@mantine/carousel";
import { Stack, Text, Title } from "@mantine/core";
import { IconArrowRight, IconArrowLeft} from '@tabler/icons-react';
import FoodCard from "@/app/gallery/_components/FoodCard";
import classes from './client.module.css'

export default function RecommendationClient({foodData}) {
    return(
        <Stack className={`${classes.main} section-card`}>
            <Text className="eyebrow">Recommended next</Text>
            <Title order={2}>Intelligent food recommendations for you</Title>
            <Text className={classes.copy}>
                Related foods can help you keep browsing without losing momentum.
                The same gallery card actions are available here too.
            </Text>
            <Carousel 
                slideSize="25%" 
                withIndicators 
                slideGap="lg"
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
