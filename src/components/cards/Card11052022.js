import React, { useState, useEffect, useContext } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { Box, Image, LinkBox, LinkOverlay } from '@chakra-ui/react'
import { StarIcon } from '@chakra-ui/icons'
import { authContext } from '../../context/auth-context'
import property from '../content/Post1'

export function Card11052022() {
  /*   const content = `Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
  sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
  Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut 
  aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`

  const property = {
    date: 'November 5, 2022',
    title: 'First Post',
    imageUrl:
      'https://res.cloudinary.com/dra1jwwjt/image/upload/v1664307412/cld-sample-2.jpg',
    imageAlt: 'First Post',
    content: content,
  } */

  return (
    <>
      <LinkBox as="article">
        <Box maxW="sm" borderWidth="1px" borderRadius="lg" overflow="hidden">
          <Image src={property.imageUrl} alt={property.imageAlt} />
          <Box p="3">
            <Box
              mt="1"
              fontWeight="semibold"
              as="h4"
              lineHeight="tight"
              noOfLines={1}
            >
              <LinkOverlay href="/about">{property.title}</LinkOverlay>
            </Box>
            <Box fontSize="sm" lineHeight="tight" noOfLines={2}>
              {property.content}
            </Box>
          </Box>
        </Box>
      </LinkBox>
    </>
  )
}
