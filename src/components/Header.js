import React, { useState, useEffect, useRef } from 'react'
import { Box, Flex, useColorModeValue, useToken } from '@chakra-ui/react'
import { HeaderMobile } from './HeaderMobile'
import { HeaderDesktop } from './HeaderDesktop'
import { isMobile } from 'react-device-detect'

export function Header() {
  const [scrollPosition, setScrollPosition] = useState(0)

  const scrollRef = useRef()

  const handleScroll = () => {
    const position = window.pageYOffset
    setScrollPosition(position)
    if (position > scrollPosition + 25 || position < 100) {
      scrollRef.current.style.top = '-8em'
      scrollRef.current.style.transition = 'top 666ms'
    }
    if (position < scrollPosition - 25 || position < 75) {
      scrollRef.current.style.top = '0'
    }
  }

  useEffect(() => {
    scrollRef.current.style.top = '0'
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const [blue200] = useToken('colors', ['blue.800'])

  return (
    <Box
      w="100%"
      bg={useColorModeValue('blackAlpha.50', 'blackAlpha.500')}
      id="header-wrap"
      ref={scrollRef}
      boxShadow={`0px 4px 6px 0px ${blue200}`}
    >
      <Flex
        id="headerNavBar"
        minH={'60px'}
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottom={1}
        borderStyle={'solid'}
        borderColor={useColorModeValue('gray.200', 'gray.900')}
        align={'center'}
      >
        {isMobile ? <HeaderMobile /> : <HeaderDesktop />}
      </Flex>
    </Box>
  )
}
