import React from 'react'
import {
  Center,
  Spacer,
  Flex,
  Text,
  Box,
  Stack,
  Icon,
  useColorModeValue,
} from '@chakra-ui/react'
import { NavLink, useNavigate } from 'react-router-dom'
import { EmailIcon } from '@chakra-ui/icons'
import { GoMarkGithub } from 'react-icons/go'

export function Footer() {
  return (
    <Flex bg={useColorModeValue('white', 'gray.800')} id="footer-wrap">
      <Box>
        <Text fontSize="xs">© Andrea Crego</Text>
      </Box>
      <Spacer />
      <Box>
        <Text
          size="xl"
          _hover={{
            color: 'pink.600',
          }}
          as="a"
          href="https://github.com/I-keep-trying/passport-email-signup"
          color={useColorModeValue('gray.600', 'gray.200')}
        >
          <Icon boxSize={6} as={GoMarkGithub} />
        </Text>
      </Box>
      <Box
        ml="5"
        _hover={{
          color: 'pink.600',
        }}
      >
        <NavLink to="/contact">
          <EmailIcon boxSize="1.5em" />{' '}
        </NavLink>
      </Box>
      <Spacer />
      <Box
        _hover={{
          color: 'pink.600',
        }}
      >
        <NavLink to="/terms">
          <Text fontSize="xs">Privacy & Terms</Text>{' '}
        </NavLink>
      </Box>
    </Flex>
  )
}
