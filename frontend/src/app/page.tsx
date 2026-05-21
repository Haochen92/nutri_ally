'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Button, Flex, Group, Text, Title } from '@mantine/core';
import classes from './page.module.css';

const highlights = [
  'Balanced macro tracking',
  'Browse thousands of foods',
  'Meal planning built into the flow',
];

export default function Homepage() {
  return (
    <section className="page-shell">
      <Flex className={classes.page}>
        <Flex className={`${classes.main} section-card`}>
          <Text className="eyebrow">Personal nutrition made practical</Text>
          <Flex className={classes.headline}>
            <Title size="h1">Personalised Nutrition Made Simple</Title>
          </Flex>
          <Flex className={classes.tagline}>
            <Text fz="lg" className={classes.copy}>
              Explore a world of food tailored to your nutritional needs.
              Choose from thousands of products, save meals as you go,
              and keep your daily targets in one clear place.
            </Text>
          </Flex>
          <Group className="metric-row">
            {highlights.map((item) => (
              <Text key={item} className="metric-pill">
                {item}
              </Text>
            ))}
          </Group>
          <Flex className={classes.buttonContainer}>
            <Button component={Link} href="/gallery" variant="filled" color="leaf.6" size="lg" radius="xl">
              Explore food gallery
            </Button>
            <Button component={Link} href="/dashboard" variant="default" size="lg" radius="xl">
              Review nutrition targets
            </Button>
          </Flex>
        </Flex>
        <div className={`${classes.visual} section-card`}>
          <div className={classes.imageFrame}>
            <Image
              src="/home_page/lunch-table.jpg"
              fill
              alt="Meal prep on a lunch table"
              className={classes.heroImage}
              sizes="(max-width: 48rem) 100vw, 42vw"
            />
          </div>
          <div className={classes.overlayCard}>
            <Text className={classes.overlayEyebrow}>Daily focus</Text>
            <Title order={3}>One flow from discovery to meal tracking</Title>
            <Text className={classes.overlayCopy}>
              Browse food, add servings directly into meals, then compare what
              you ate against your macro and nutrient targets.
            </Text>
          </div>
        </div>
      </Flex>
    </section>
  );
}
