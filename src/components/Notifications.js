import React, { useContext, useEffect } from 'react'
import { authContext } from '../context/auth-context'
import { Box, Highlight } from '@chakra-ui/react'

export const Notifications = () => {
  const ctx = useContext(authContext)

  useEffect(() => {
    ctx.message &&
      setTimeout(() => {
        ctx.setMessage(null)
      }, 4000)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ctx.message])

  return (
    ctx.message && (
      <Box mt="100px" textAlign="center">
        <Highlight
          query={ctx.message.text}
          styles={{ px: '1', py: '1', rounded: 'full', bg: 'orange' }}
        >
          {ctx.message.text}
        </Highlight>
      </Box>
    )
  )
}
