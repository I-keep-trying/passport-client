import React, { useState, useContext, useEffect, useRef } from 'react'
import { useNavigate, NavLink } from 'react-router-dom'
import {
  Box,
  VStack,
  Grid,
  Input,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  InputRightElement,
  InputGroup,
  Button,
  ButtonGroup,
  Flex,
  Text,
  Heading,
} from '@chakra-ui/react'
import { authContext } from '../context/auth-context'

export const Login = () => {
  const ctx = useContext(authContext)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [show, setShow] = useState(false)

  const navigate = useNavigate()

  const emailInput = useRef()

  const handleEmailInputChange = (e) => {
    setEmail(e.target.value)
  }

  const handlePwInputChange = (e) => {
    setPassword(e.target.value)
  }

  useEffect(() => {
    ctx.loginPage()
    !ctx.userData && ctx.pingServer()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    emailInput.current.focus()
  }, [emailInput])

  useEffect(() => {
    ctx.isLoggedIn && navigate('/')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ctx.isLoggedIn])

  const login = async (e) => {
    e.preventDefault()
    if (!email || !password) {
      ctx.setMessage({ type: 'error', text: 'Please fill all form fields.' })
    }
    await ctx.handleLogin({
      email,
      password,
      userData: ctx.userData,
    })
  }

  const handleClick = () => setShow(!show)

  const cancel = () => navigate(-1)

  return (
    <Flex width="Full" align="center" justifyContent="center">
      <Box textAlign="center" fontSize="xl">
        <Grid minH="100vh" p={3}>
          <VStack spacing={8}>
            <Heading> Login </Heading>
            <form onSubmit={login}>
              <FormControl isRequired>
                <FormLabel>Email</FormLabel>
                <Input
                  ref={emailInput}
                  type="email"
                  value={email}
                  onChange={handleEmailInputChange}
                />
                {!ctx.message?.type === 'error' ? (
                  <FormHelperText>We'll never share your email.</FormHelperText>
                ) : (
                  <FormErrorMessage>{ctx.message?.text}</FormErrorMessage>
                )}
              </FormControl>
              <FormControl isRequired>
                <FormLabel mt="4">Password</FormLabel>
                <InputGroup size="lg">
                  <Input
                    pr="4.5rem"
                    type={show ? 'text' : 'password'}
                    placeholder="Enter password"
                    value={password}
                    onChange={handlePwInputChange}
                  />
                  <InputRightElement width="4.5rem">
                    <Button h="1.75rem" size="sm" onClick={handleClick}>
                      {show ? 'Hide' : 'Show'}
                    </Button>
                  </InputRightElement>
                </InputGroup>
                <FormHelperText>
                  <Text>
                    Trouble logging in?
                    <Text as="i">
                      <NavLink to="/forgot"> Request password reset.</NavLink>
                    </Text>
                  </Text>
                </FormHelperText>
              </FormControl>{' '}
              <ButtonGroup mt={4} spacing={8}>
                <Button type="submit">Login</Button>
                <Button onClick={cancel}>Cancel</Button>
              </ButtonGroup>
            </form>
          </VStack>
        </Grid>
      </Box>
    </Flex>
  )
}
