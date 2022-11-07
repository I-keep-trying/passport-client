import React, { useState, useEffect, useContext } from 'react'
import { Box, Image, HStack, Grid, Badge, useConst } from '@chakra-ui/react'
import { StarIcon } from '@chakra-ui/icons'
import { authContext } from '../context/auth-context'

export default function Card() {
  const [date, setDate] = useState(null)
  const event = new Date(Date.now())
  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  }
  const dateStamp = event.toLocaleString('en-US', options).toString()
  useEffect(() => {
    !date && setDate(dateStamp)
  }, [date])
  console.log('date: ', date)
  console.log('dateStamp: ', dateStamp)

  const property = {
    imageUrl: 'https://bit.ly/2Z4KKcF',
    imageAlt: 'Second Post',
    beds: 3,
    baths: 2,
    title: 'Modern home in city center in the heart of historic Los Angeles',
    formattedPrice: '$1,900.00',
    reviewCount: 34,
    rating: 4,
  }

  const content = `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`

  return (
    <Box maxW="30%" borderWidth="1px" borderRadius="lg" overflow="hidden">
      <Image src={property.imageUrl} alt={property.imageAlt} />
<Box>Date: {date} </Box>
      <Box p="6">
        <Box
          mt="1"
          fontWeight="semibold"
          as="h4"
          lineHeight="tight"
          noOfLines={1}
        >
          {property.title}
        </Box>
        <Box fontSize="xs" noOfLines={4}>
          {content}
        </Box>
      </Box>
    </Box>
  )
}

