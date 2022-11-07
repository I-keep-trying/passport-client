import React, { useState, useEffect, useContext } from 'react'
import {
  Box,
  Image,
  HStack,
  SimpleGrid,
  Badge,
  useConst,
} from '@chakra-ui/react'
import { authContext } from '../context/auth-context'
import { isMobile } from 'react-device-detect'
import { Card11052022 } from './cards/Card11052022'

export const Home = () => {
  const ctx = useContext(authContext)

  useEffect(() => {
    if (!ctx.userData) {
      ctx.pingServer()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <HStack mt="100">
      <SimpleGrid columns={isMobile ? 1 : 2} spacing={10}>
        <Card11052022 />
        <Card11052022 />
        <Card11052022 />
        <Card11052022 />
      </SimpleGrid>
    </HStack>
  )
}
