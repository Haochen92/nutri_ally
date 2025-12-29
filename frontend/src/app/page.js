'use client'

import Link from "next/link"
import Image from "next/image"
import { Flex, Button, Title, Text} from '@mantine/core'
import classes from './page.module.css'

export default function Homepage() {
  return(
    <Flex className={classes.page} >
      <Image src="/home_page/lunch-table.jpg" fill={true} alt="Background Image" style={{zIndex: -1}} />
      <Flex className={classes.main}>
        <Flex className={classes.headline}>
          <Title size="h1">Personalised Nutrition <br/> Made Simple</Title>
        </Flex>
        <Flex className={classes.tagline}>
          <Text fz='md'>
            Explore a world of food tailored to your nutritional needs. 
            Choose from thousands of products, and let us recommend what your body truly needs
          </Text>
        </Flex>
        <Flex className={classes.buttonContainer}>
          <Button 
            className={classes.button}
            component={Link} 
            href='/gallery'
            variant="filled"
            color="teal.9"
            size="md"
            radius="lg"
          > 
            Explore 
          </Button>
        </Flex>
      </Flex>    
    </Flex>   
  )
}