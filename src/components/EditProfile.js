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
import debounce from '../services/debounce'

export const EditProfile = () => {
  const ctx = useContext(authContext)
  const [name, setName] = useState(ctx.user.name)
  const [imageUrl, setImageUrl] = useState(ctx.user.avatar)
  const [nickname, setNickname] = useState('')

  const navigate = useNavigate()

  const handleNameInputChange = (e) => setName(e.target.value)

  const handleHiddenInputChange = (e) => setNickname(e.target.value)

  const handleFormSubmit = (e) => {
    e.preventDefault()
    nickname === '' &&
      debounce(
        ctx.handleEdit({
          id: ctx.user.id,
          name: name,
          avatar: imageUrl,
        })
      )
    navigate('/user')
  }

  const cancel = () => navigate('/user')

  const options = {
    cloudName: process.env.REACT_APP_CLOUDNAME,
    uploadPreset: process.env.REACT_APP_PRESET,
    cropping: true,
    multiple: false,
    theme: 'purple',
    maxImageFileSize: 2000000,
    singleUploadAutoClose: false,
  }

  const handleClick = () => {
    window.cloudinary.openUploadWidget(options, (error, result) => {
      error && console.log('Cloudinary Error: ', error)
      if (result && result.event === 'queues-end') {
        setImageUrl(result.info.files[0].uploadInfo.secure_url)
      }
    })
  }

  return (
    <Box fontSize="xl">
      <Container maxW="md">
        <Stack spacing={8}>
          <Center>
            <Text fontSize="3xl">Account Settings</Text>
          </Center>

          <form onSubmit={handleFormSubmit}>
            <FormControl>
              <FormLabel>Avatar</FormLabel>
              <Button onClick={handleClick}>Upload</Button>
              {imageUrl !== '' && <FormHelperText>{imageUrl}</FormHelperText>}
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
              <Input
                name="nickname"
                value={nickname}
                style={{ visibility: 'hidden' }}
                onChange={handleHiddenInputChange}
              />
            </FormControl>
          </form>
        </Stack>
      </Container>
    </Box>
  )
}
