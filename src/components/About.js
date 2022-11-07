import React from 'react'
import { NavLink } from 'react-router-dom'
import { Text, Heading, Stack } from '@chakra-ui/react'

export const About = () => {
  return (
    <>
      <div>
      </div>
      <Stack spacing={4}>
        <Heading>About Me</Heading>
        <Text>NOVEMBER 5, 2022</Text>
        <Text>
          {`I absolutely love coding. I don't know if I'm any good at it, but 
            I'll use this website to show off some of my MERN stack apps.`}
        </Text>
        <Text>
          {`In the coming days/weeks I will be adding more content and 
            functionality.`}
        </Text>
        <Text>
          {`You can register for an account but there's nothing user-specific yet. Scout's honor, I won't do anything with your email.
            It is used as both a unique identifier and to send security verification for registration and login.`}
        </Text>
        <Text>
          {`If you are a pentester, please feel free to`}{' '}
          <NavLink id="link" to="/contact">
            {' '}
            contact me.
          </NavLink>{' '}
          {`I would love
            to know if I got anything wrong. It's probably safe to assume I missed something.`}
        </Text>
      </Stack>
    </>
  )
}
