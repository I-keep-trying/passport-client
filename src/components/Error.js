import React from 'react'
import { Box, Text, Image, useColorModeValue } from '@chakra-ui/react'
import bgImage from '../assets/404.avif'

export const Error = () => {
  return (
    <>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        boxSize="100%"
      >
        <Image
          src={bgImage}
          boxSize="full"
        />
        <Box
          pos="absolute"
          bg={useColorModeValue('blackAlpha.50', 'blackAlpha.500')}
          fontSize={{ base: '1.5rem', md: '2.5rem' }}
          mb='150'
        >
         There's nothing here. 😐
        </Box>
        <Text
          as="a"
          href="https://unsplash.com/@lox?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText"
          top="95%"
          left="15%"
          fontSize="20px"
          transform="translate(-30%,-50%)"
          pos="absolute"
        >
          Photo by Lachlan Donald on Unsplash
        </Text>
      </Box>
    </>
  )
}
