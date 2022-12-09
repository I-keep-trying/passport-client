import React from 'react'
import { Text, Heading, Stack } from '@chakra-ui/react'
import image from '../../assets/photo-2.jfif'

export const content = `Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut 
aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`

export const postData = {
  date: 'November 10, 2022',
  title: 'Second Post',
  imageUrl: image,
  imageAlt: 'Second Post',
  content: content,
}

export const Post2 = () => {
  return (
    <>
      <Stack spacing={4}>
        <Heading>{postData.title} </Heading>
        <Text>{postData.date} </Text>
        <Text mt={20}>{postData.content} </Text>
      </Stack>
    </>
  )
}
