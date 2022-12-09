import React, { useContext, useState } from 'react'
import { useNavigate, NavLink } from 'react-router-dom'
import { isMobile } from 'react-device-detect'
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
  InputGroup,
  InputRightElement,
  Progress,
  Tooltip,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverBody,
} from '@chakra-ui/react'
import { InfoIcon } from '@chakra-ui/icons'
import zxcvbn from 'zxcvbn'
import debounce from '../services/debounce'

import { authContext } from '../context/auth-context'

export const ChangePw = () => {
  const [oldPassword, setOldPassword] = useState('')
  const [password, setPassword] = useState('')
  const [showOld, setShowOld] = useState(false)
  const [show, setShow] = useState(false)
  const [nickname, setNickname] = useState('')

  const ctx = useContext(authContext)

  const navigate = useNavigate()

  const toggleOldPassword = () => {
    setShowOld(!showOld)
  }

  const togglePassword = () => {
    setShow(!show)
  }

  const handleCancel = () => {
    navigate(-1)
  }

  const handleOldPwInputChange = (e) => {
    setOldPassword(e.target.value)
  }

  const handlePwInputChange = (e) => {
    setPassword(e.target.value)
  }

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
        return { value: 30, color: 'pink' }
      case 2:
        return { value: 50, color: 'orange' }
      case 3:
        return { value: 70, color: 'yellow' }
      case 4:
        return { value: 100, color: 'whatsapp' }
      default:
        return { value: 10, color: 'red' }
    }
  }

  const testedResult = zxcvbn(password)

  const pwBar = createPasswordBar(testedResult)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (password.length < 8) {
      ctx.setMessage({
        type: 'error',
        text: 'Password must be at least 8 characters.',
      })
    } else if (password.length > 64) {
      ctx.setMessage({
        type: 'error',
        text: 'What are you trying to do??? 😨 Password must be less than 64 characters.',
      })
    } else if (oldPassword.toLowerCase() === password.toLowerCase()) {
      ctx.setMessage({
        type: 'warning',
        text: 'New password is too similar. ',
      })
    } else {
      const res = await ctx.handleReset({
        oldPassword,
        password,
        email: ctx.user.email,
      })
      nickname === '' && debounce(res)

      if (res.success) {
        ctx.handleLogout()
        navigate('/login')
      }
    }
  }

  return (
    <Box fontSize="xl">
      <Container maxW="md">
        <Stack spacing={8}>
          <Center>
            <Text fontSize="3xl">Change Password</Text>
          </Center>
          <form onSubmit={handleSubmit}>
            <FormControl isRequired>
              <FormLabel>Old (Current) Password</FormLabel>
              <InputGroup size="lg">
                <Input
                  pr="4.5rem"
                  type={showOld ? 'text' : 'password'}
                  placeholder="Enter password"
                  value={oldPassword}
                  onChange={handleOldPwInputChange}
                />
                <InputRightElement width="4.5rem">
                  <Button h="1.75rem" size="sm" onClick={toggleOldPassword}>
                    {show ? 'Hide' : 'Show'}
                  </Button>
                </InputRightElement>
              </InputGroup>
              <FormHelperText>
                <Text>
                  Forgot password? Reset it
                  <Text as="i">
                    <NavLink to="/forgot"> here.</NavLink>
                  </Text>
                </Text>
              </FormHelperText>
              <FormLabel mt="1.5rem">
                New Password
                {isMobile ? (
                  <Popover>
                    <PopoverTrigger>
                      <InfoIcon ml="4px" />
                    </PopoverTrigger>
                    <PopoverContent>
                      <PopoverArrow />

                      <PopoverBody>
                        <Text fontSize="xs">
                          Passwords must be no less than 8, and no more than 64
                          characters
                        </Text>
                      </PopoverBody>
                    </PopoverContent>
                  </Popover>
                ) : (
                  <Tooltip
                    label={
                      <>
                        <Text fontSize="xs">
                          Passwords must be no less than 8,
                        </Text>
                        <Text fontSize="xs">
                          and no more than 64 characters
                        </Text>
                      </>
                    }
                    fontSize="md"
                  >
                    <InfoIcon ml="4px" />
                  </Tooltip>
                )}
              </FormLabel>
              <InputGroup size="lg">
                <Input
                  pr="4.5rem"
                  type={show ? 'text' : 'password'}
                  placeholder="Enter password"
                  value={password}
                  onChange={handlePwInputChange}
                />
                <InputRightElement width="4.5rem">
                  <Button h="1.75rem" size="sm" onClick={togglePassword}>
                    {show ? 'Hide' : 'Show'}
                  </Button>
                </InputRightElement>
              </InputGroup>
              <Progress value={pwBar.value} colorScheme={pwBar.color} />
              <Box>
                {password.length > 0 && createPasswordLabel(testedResult)}
                {password.length > 0 &&
                  testedResult.feedback.suggestions.map((suggestion, i) => (
                    <React.Fragment key={i}>
                      <Box key={i}>
                        <FormHelperText as="sup">{suggestion}</FormHelperText>
                      </Box>
                    </React.Fragment>
                  ))}
              </Box>
              <ButtonGroup mt={4} spacing={8}>
                <Button type="submit">Save</Button>
                <Button onClick={handleCancel}>Cancel</Button>              
              </ButtonGroup>
            </FormControl>
            <Input
              name="nickname"
              value={nickname}
              style={{ visibility: 'hidden' }}
              onChange={handleHiddenInputChange}
            />
          </form>
        </Stack>
      </Container>
    </Box>
  )
}
