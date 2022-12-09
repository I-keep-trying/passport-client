import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Box, Image, LinkBox, LinkOverlay } from '@chakra-ui/react'
import { postData } from '../content/Post2'

export function Card11102022() {
  const navigate = useNavigate()

  const handleClick = () => navigate('/post2')
  return (
    <>
      <LinkBox>
        <Box maxW="sm" borderWidth="1px" borderRadius="lg" overflow="hidden">
          <Image src={postData.imageUrl} alt={postData.imageAlt} />
          <Box p="3">
            <Box
              mt="1"
              fontWeight="semibold"
              as="h4"
              lineHeight="tight"
              noOfLines={1}
            >
              <LinkOverlay id="link-overlay" onClick={handleClick}>
                {postData.title}
              </LinkOverlay>
            </Box>
            <Box fontSize="sm" lineHeight="tight" noOfLines={2}>
              {postData.content}
            </Box>
          </Box>
        </Box>
      </LinkBox>
    </>
  )
}
