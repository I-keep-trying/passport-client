import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Box,
  Input,
  FormControl,
  FormLabel,
  FormHelperText,
  Button,
  Flex,
  Heading,
  ButtonGroup,
  Textarea,
  useConst,
} from '@chakra-ui/react'
import { EmailIcon } from '@chakra-ui/icons'
import { authContext } from '../context/auth-context'
import debounce from '../services/debounce'

export const Contact = () => {
  const ctx = useContext(authContext)
  const userEmail = useConst(() => ctx.isLoggedIn && ctx.user.email)

  const [name, setName] = useState('')
  const [email, setEmail] = useState(userEmail ? userEmail : '')
  const [message, setMessage] = useState('Message from contact form')
  const [nickname, setNickname] = useState('')

  const handleNameInputChange = (e) => setName(e.target.value)
  const handleEmailInputChange = (e) => setEmail(e.target.value)
  const handleMessage = (e) => setMessage(e.target.value)
  const handleHiddenInputChange = (e) => setNickname(e.target.value)

  const handleSubmit = (e) => {
    e.preventDefault()
    nickname === '' &&
      debounce(ctx.handleContactForm({ name: name, email: email, message: message }))
    setName('')
    setEmail('')
    setMessage('')
    navigate('/')
  }

  const navigate = useNavigate()

  const cancel = () => navigate(-1)

  return (
    <Flex width="Full" align="center" justifyContent="center">
      <Box w="80%" textAlign="center" fontSize="xl">
        <Heading>Contact Me</Heading>
        <form onSubmit={handleSubmit}>
          <FormControl w="50%">
            <FormLabel>Name</FormLabel>
            <Input
              placeholder="Name"
              value={name}
              onChange={handleNameInputChange}
            />
          </FormControl>
          {!ctx.isLoggedIn && (
            <FormControl w="50%">
              <FormLabel mt="4">Email (optional) </FormLabel>
              <Input
                type="email"
                value={email}
                onChange={handleEmailInputChange}
                placeholder="you@email.com"
              />
              <FormHelperText mt={0}>
                Pinky swear: I will never share your email.
              </FormHelperText>
            </FormControl>
          )}
          <FormControl isRequired>
            <FormLabel mt={2}>Message</FormLabel>
            <Textarea
              value={message}
              onChange={handleMessage}
              placeholder="Say something..."
              size="sm"
              maxLength="5000"
            />
            <FormHelperText mt={0}>
              Limit: {JSON.stringify(5000 - message.length)}
            </FormHelperText>
          </FormControl>
          <Input
            name="nickname"
            value={nickname}
            style={{ visibility: 'hidden' }}
            onChange={handleHiddenInputChange}
          />
          <ButtonGroup mt={4} spacing={8}>
            <Button type="submit">
              Send <EmailIcon ml="3" />{' '}
            </Button>
            <Button onClick={cancel}>Cancel</Button>
          </ButtonGroup>
        </form>
      </Box>
    </Flex>
  )
}
