import React, { useContext } from 'react'
import {
  Box,
  Flex,
  IconButton,
  Button,
  Stack,
  Avatar,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useColorModeValue,
  Text,
  Icon,
  Divider,
} from '@chakra-ui/react'
import { NavLink, useNavigate } from 'react-router-dom'
import { ChevronDownIcon } from '@chakra-ui/icons'
import { Logo } from './Logo'
import { authContext } from '../context/auth-context'
import ThemeToggle from './ThemeToggle'
import { GoMarkGithub } from 'react-icons/go'

const AvMenu = ({ isOpen, onClose }) => {
  const ctx = useContext(authContext)
  const navigate = useNavigate()

  const user = () => navigate('/user')
  const changepw = () => navigate('/changepw')
  return (
    <>
      <MenuButton
        isActive={isOpen}
        as={Button}
        rightIcon={<ChevronDownIcon />}
        variant="ghost"
      >
        <Avatar name="" size="sm" src={ctx.user.avatar} />
      </MenuButton>
      <MenuList>
        <MenuItem onClick={user}>Settings</MenuItem>
        <MenuItem onClick={changepw}>Security</MenuItem>
      </MenuList>
    </>
  )
}

export function HeaderDesktop() {
  const ctx = useContext(authContext)

  const navigate = useNavigate()

  const handleLogout = () => {
    ctx.handleLogout()
    navigate('/')
  }

  const login = () => navigate('/login')
  const register = () => navigate('/register')

  return (
    <>
      <Flex flex={{ base: 1 }}>
        <Box p={0} w="4%">
          <NavLink to="/">
            <IconButton
              aria-label="logo"
              variant="link"
              size="md"
              icon={<Logo boxSize="2em" objectFit="cover" />}
            />
          </NavLink>
        </Box>
        <Flex ml={10}>
          {/* Left menu wrap */}
          <Stack mt="9px" direction={'row'} spacing={4}>
            {/* Left menu items */}
            <Box
              _hover={{
                color: 'pink.600',
              }}
            >
              <NavLink to="/">Home</NavLink>
            </Box>
            <Box
              _hover={{
                color: 'pink.600',
              }}
            >
              <NavLink to="/contact">Contact Me</NavLink>
            </Box>
            <Box
              _hover={{
                color: 'pink.600',
              }}
            >
              <NavLink to="/about">About</NavLink>
            </Box>
            <Divider orientation="vertical" />
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
          </Stack>
        </Flex>
      </Flex>

      {/* Right aligned menu */}
      <Stack justify={'flex-end'} direction={'row'} spacing={6}>
        {!ctx.isLoggedIn ? (
          <>
            <Button
              fontSize={'sm'}
              fontWeight={400}
              variant={'link'}
              _hover={{
                color: 'pink.600',
              }}
              onClick={login}
            >
              Sign In
            </Button>
            <Button
              fontSize={'sm'}
              fontWeight={600}
              color={'white'}
              bg={'pink.600'}
              _hover={{
                bg: 'pink.700',
              }}
              onClick={register}
            >
              Sign Up
            </Button>
          </>
        ) : (
          <>
            <Button
              variant={'link'}
              fontSize={'sm'}
              fontWeight={400}
              onClick={handleLogout}
              _hover={{
                color: 'pink.600',
              }}
            >
              Log out
            </Button>
            <Menu>
              <AvMenu />
            </Menu>
          </>
        )}
        <ThemeToggle />
      </Stack>
    </>
  )
}
