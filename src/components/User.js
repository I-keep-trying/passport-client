import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Box,
  Text,
  Stack,
  Center,
  Container,
  Avatar,
  Button,
} from '@chakra-ui/react'
import { authContext } from '../context/auth-context'

export const Account = () => {
  const ctx = useContext(authContext)
  console.log('ctx.user',ctx.user)
  const navigate = useNavigate()
  const handleEdit = () => {
    navigate('/edit')
  }

  return (
    <Box fontSize="xl">
      <Container maxW="md">
        <Stack spacing={8}>
          <Center>
            <Box>
              <Text fontSize="3xl">Account Settings</Text>
              <Center>
                <Button onClick={handleEdit}>Edit</Button>
              </Center>
            </Box>
          </Center>
          <Avatar name="" size="lg" src={ctx.user.avatar} />
          <Text>Name: {ctx.user.name}</Text>
          <Text>Email: {ctx.user.email} </Text>
        </Stack>
      </Container>
    </Box>
  )
}
