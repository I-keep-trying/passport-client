import React, { useState, useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { isMobile } from 'react-device-detect'
import {
  Box,
  VStack,
  Grid,
  Input,
  FormControl,
  FormLabel,
  FormHelperText,
  InputRightElement,
  InputGroup,
  Button,
  Progress,
  Flex,
  Heading,
  ButtonGroup,
  Tooltip,
  Text,
} from '@chakra-ui/react'
import { InfoIcon } from '@chakra-ui/icons'
import zxcvbn from 'zxcvbn'
import { authContext } from '../context/auth-context'
import debounce from '../services/debounce'

export const ForgotPw = () => {
  const ctx = useContext(authContext)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [show, setShow] = useState(false)
  const [nickname, setNickname] = useState('')

  const navigate = useNavigate()

  const handlePwInputChange = (e) => setPassword(e.target.value)
  const handleEmailInputChange = (e) => setEmail(e.target.value)
  const handleHiddenInputChange = (e) => setNickname(e.target.value)

  const createPasswordLabel = (result) => {
    switch (result.score) {
      case 0:
        return 'Terrible'
      case 1:
        return 'Weak'
      case 2:
        return 'Fair'
      case 3:
        return 'Good'
      case 4:
        return 'Strong'
      default:
        return 'Weak'
    }
  }

  const createPasswordBar = (result) => {
    switch (result.score) {
      case 0:
        return { value: 10, color: 'red' }
      case 1:
        return { value: 40, color: 'pink' }
      case 2:
        return { value: 60, color: 'orange' }
      case 3:
        return { value: 80, color: 'yellow' }
      case 4:
        return { value: 100, color: 'whatsapp' }
      default:
        return { value: 10, color: 'red' }
    }
  }

  const testedResult = zxcvbn(password)

  const pwBar = createPasswordBar(testedResult)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (password.length < 8) {
      ctx.setMessage({
        type: 'error',
        text: 'Passwords must be at least 8 characters.',
      })
    } else if (password.length > 64) {
      ctx.setMessage({
        type: 'error',
        text: 'What are you trying to do??? 😨 Passwords must be less than 64 characters.',
      })
      setPassword('')
    } else {
      nickname === '' &&
        debounce(
          ctx.handleForgot({
            email,
            password,
            event: 'forgot',
          })
        )
    }
  }

  useEffect(() => {
    ctx.message?.type === 'success' && navigate('/login')
  }, [ctx.message])

  const handleClick = () => setShow(!show)

  const cancel = () => navigate(-1)

  return (
    <Flex width="Full" align="center" justifyContent="center">
      <Box textAlign="center" fontSize="xl">
        <Grid minH="100vh" p={3}>
          <VStack spacing={8}>
            <Heading>Reset Password</Heading>
            <form onSubmit={handleSubmit}>
              <FormControl isRequired>
                <FormLabel>Email</FormLabel>
                <Input
                  type="email"
                  value={email}
                  onChange={handleEmailInputChange}
                />
                <FormHelperText>Enter your registered email.</FormHelperText>
                <FormHelperText>
                  We'll send you a link to complete your password reset.
                </FormHelperText>
              </FormControl>
              <FormControl isRequired>
                <FormLabel mt="4">
                  New Password
                  {!isMobile && (
                    <Tooltip
                      label={
                        <>
                          <Text fontSize="xs">Passwords must at least 8,</Text>
                          <Text fontSize="xs">and less than 64 characters</Text>
                        </>
                      }
                      fontSize="md"
                    >
                      <InfoIcon ml="4px" />
                    </Tooltip>
                  )}
                </FormLabel>
                <InputGroup size="md">
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
                <Progress value={pwBar.value} colorScheme={pwBar.color} />

                <Box>
                  {password.length > 0 && (
                    <>
                      {createPasswordLabel(testedResult)}
                      {testedResult.feedback.suggestions.map(
                        (suggestion, i) => (
                          <React.Fragment key={i}>
                            <Box>
                              <FormHelperText as="sup">
                                {suggestion}
                              </FormHelperText>
                            </Box>
                          </React.Fragment>
                        )
                      )}
                    </>
                  )}
                  {isMobile && (
                    <FormHelperText>
                      Use at least 8 characters, but less than 64.
                    </FormHelperText>
                  )}
                </Box>
              </FormControl>
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
            </form>
          </VStack>
        </Grid>
      </Box>
    </Flex>
  )
}
