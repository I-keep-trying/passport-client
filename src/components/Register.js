import React, { useState, useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
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
  Text,
} from '@chakra-ui/react'
import zxcvbn from 'zxcvbn'
import { authContext } from '../context/auth-context'
import data from '../data/myJson'
import Select from 'react-select'
//TODO: provide 'resend activation email' option
export const Register = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [show, setShow] = useState(false)
  const [domain, setDomain] = useState(null)

  const ctx = useContext(authContext)

  const navigate = useNavigate()

  const handleNameInputChange = (e) => setName(e.target.value)
  const handleEmailInputChange = (e) => {
    setEmail(e.target.value)

    if (e.target.value.includes('@')) {
      const regex = /@\S*/g
      const regex2 = /^.*@/g
      const found = e.target.value.match(regex)
      const found2 = found[0].substring(1)
      const emailPre = e.target.value.match(regex2)
      //   console.log('found', found)
      console.log('found2', found2)
      console.log('emailPre', emailPre)
      setDomain(found2)
      setEmail(`${emailPre}${found2}`)
    }
  }
  /*   useEffect(() => {
const domains = data.filter(item => item.includes(domain))
  },[domain]) */
  console.log('email: ', email)
  console.log('domain: ', domain)
  const foundDomain = data.filter((item) => item.startsWith(domain))
  console.log('foundDomain', foundDomain)

  const handlePwInputChange = (e) => setPassword(e.target.value)

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

  const register = async (e) => {
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
      setPassword('')
    } else {
      const reg = await ctx.handleRegister({
        name: name,
        email: email,
        password,
        event: 'register',
      })
      return reg
    }
  }

  const handleClick = () => setShow(!show)

  const cancel = () => navigate(-1)

  const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' }
  ]

  return (
    <Flex width="Full" align="center" justifyContent="center">
      <Box textAlign="center" fontSize="xl">
        <Grid minH="100vh" p={3}>
          <VStack spacing={8}>
            <Heading> Create Account </Heading>
            <form onSubmit={register}>
              <FormControl isRequired>
                <FormLabel>Name</FormLabel>
                <Input
                  placeholder="Name"
                  value={name}
                  onChange={handleNameInputChange}
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel mt="4">Email</FormLabel>
                {ctx.emailErr && (
                  <Text fontSize="sm">
                    You entered{' '}
                    <Text as="kbd">{`"${ctx.emailErr.param}"`}</Text>, did you
                    mean{' '}
                    <Text as="kbd"> {`"${ctx.emailErr.validationError}"`}</Text>
                    ?
                  </Text>
                )}
                <Input
                  type="email"
                  value={email}
                  onChange={handleEmailInputChange}
                  placeholder="you@email.com"
                />
              {/*   <Select options={options} /> */}
                <FormHelperText>We'll never share your email.</FormHelperText>
              </FormControl>
              <FormControl isRequired>
                <FormLabel mt="4">Password</FormLabel>
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
                  {password.length > 0 ? (
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
                  ) : (
                    <FormHelperText as="sup">
                      Password must be at least 8 characters, but no more than
                      64.
                    </FormHelperText>
                  )}
                </Box>
              </FormControl>
              <ButtonGroup mt={4} spacing={8}>
                <Button type="submit">Create Account</Button>
                <Button onClick={cancel}>Cancel</Button>
              </ButtonGroup>
            </form>
          </VStack>
        </Grid>
      </Box>
    </Flex>
  )
}
