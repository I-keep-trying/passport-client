import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Box,
  Text,
  Stack,
  Center,
  Container,
  FormControl,
  FormLabel,
  FormHelperText,
  Input,
  Button,
  ButtonGroup,
} from '@chakra-ui/react'

import { authContext } from '../context/auth-context'

export const EditProfile = () => {
  const ctx = useContext(authContext)
  const [name, setName] = useState(ctx.user.name)

  const navigate = useNavigate()

  const handleNameInputChange = (e) => setName(e.target.value)

  const handleFormSubmit = (e) => {
    e.preventDefault()
    ctx.handleEdit({
      id: ctx.user.id,
      name: name,
    })
    navigate('/user')
  }

  const cancel = () => navigate('/user')

  return (
    <Box fontSize="xl">
      <Container maxW="md">
        <Stack spacing={8}>
          <Center>
            <Text fontSize="3xl">Account Settings</Text>
          </Center>

          <form onSubmit={handleFormSubmit}>
            <FormControl>
              <FormLabel>Name</FormLabel>
              <Input
                placeholder="Name"
                value={name}
                onChange={handleNameInputChange}
              />
              <FormLabel mt={4}>Email</FormLabel>
              <Input isDisabled placeholder="Email" value={ctx.user.email} />
              <FormHelperText>
                For security reasons, email cannot be changed.
              </FormHelperText>
              <ButtonGroup mt={4} spacing={8}>
                <Button type="submit">Save</Button>
                <Button onClick={cancel}>Cancel</Button>
              </ButtonGroup>
            </FormControl>
          </form>
        </Stack>
      </Container>
    </Box>
  )
}
