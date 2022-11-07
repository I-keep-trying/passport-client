import React, { useContext } from 'react'
import {
  Flex,
  Text,
  IconButton,
  Button,
  Stack,
  useColorModeValue,
  useDisclosure,
  Avatar,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Drawer,
  DrawerContent,
  DrawerCloseButton,
  Spacer,
  Icon,
  Divider
} from '@chakra-ui/react'
import { NavLink, useNavigate } from 'react-router-dom'
import { HamburgerIcon, CloseIcon, ChevronDownIcon } from '@chakra-ui/icons'
import { authContext } from '../context/auth-context'
import ThemeToggle from './ThemeToggle'
import { GoMarkGithub } from "react-icons/go"

export const HeaderMobile = () => {
  const { isOpen, onToggle, onClose } = useDisclosure()
  const ctx = useContext(authContext)
  const navigate = useNavigate()

  const handleLogout = () => {
    ctx.handleLogout()
    navigate('/')
  }
  const btnRef = React.useRef()

  return (
    <>
      <IconButton
        ref={btnRef}
        onClick={onToggle}
        icon={
          isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />
        }
        variant={'ghost'}
        aria-label={'Toggle Navigation'}
      />
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        finalFocusRef={btnRef}
        bg="white"
      >
        <DrawerContent>
          <DrawerCloseButton />
          <MobileNav onToggle={onToggle} handleLogout={handleLogout} />
        </DrawerContent>
      </Drawer>
      <Spacer />
      <>
        {!ctx.isLoggedIn ? (
          <Button
            fontSize={'sm'}
            fontWeight={400}
            variant={'outline'}
            onClick={() => navigate('/register')}
          >
            Sign Up
          </Button>
        ) : (
          <Menu>
            <MenuButton
              isActive={isOpen}
              as={Button}
              rightIcon={<ChevronDownIcon />}
              variant="ghost"
            >
              <Avatar name="" size="sm" src={ctx.user.avatar} />
            </MenuButton>
            <MenuList>
              <MenuItem onClick={() => navigate('/user')}>Settings</MenuItem>
              <MenuItem onClick={() => navigate('/changepw')}>
                Security
              </MenuItem>
              <MenuItem onClick={handleLogout}>Log Out</MenuItem>
            </MenuList>
          </Menu>
        )}
        <ThemeToggle />
      </>
    </>
  )
}

const MobileNav = ({ onToggle, handleLogout }) => {
  const ctx = useContext(authContext)
  return (
    <Stack
      id="mobile-stack outer"
      bg={useColorModeValue('white', 'gray.800')}
      p={4}
    >
      <Stack onClick={onToggle} spacing={4}>
        <Flex py={2} justify={'space-between'} align={'center'}>
          <NavLink to="/">
            <Text
              fontWeight={600}
              color={useColorModeValue('gray.600', 'gray.200')}
            >
              Home
            </Text>
          </NavLink>
        </Flex>
      </Stack>
      <Divider />
      <Stack onClick={onToggle} spacing={4}>
        <Flex py={2} justify={'space-between'} align={'center'}>
          <Text
            as="a"
            href="https://github.com/I-keep-trying/passport-email-signup"
            fontWeight={600}
            color={useColorModeValue('gray.600', 'gray.200')}
          >
            <Icon as={GoMarkGithub} />
          </Text>
        </Flex>
      </Stack>
      {!ctx.isLoggedIn && (
        <NavLink onClick={onToggle} to="/login">
          <Button
            mt="3em"
            width="100%"
            fontSize={'sm'}
            fontWeight={600}
            color={'white'}
            bg={'pink.700'}
          >
            Sign In
          </Button>
        </NavLink>
      )}
    </Stack>
  )
}
