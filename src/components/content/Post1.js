import React from 'react'
import { Text, Heading, Stack } from '@chakra-ui/react'
import postData from '../content/nov05-2022'
import {Code} from '../Code'

export const Post1 = () => {
  return (
    <>
      <Stack spacing={4}>
        <Heading>{postData.title} </Heading>
        <Text>{postData.date} </Text>
        <Code />
        <Text mt={20}>{postData.content} </Text>
      </Stack>
    </>
  )
}
