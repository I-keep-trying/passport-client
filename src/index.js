import React from 'react'
import ReactDOM from 'react-dom/client'
import { AuthContext } from './context/auth-context'
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react'
import App from './App'
import Basic from './components/Basic'
import theme from './theme'
//console.log('theme', theme)

const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <AuthContext>
        <App />
      </AuthContext>
    </ChakraProvider>
  </React.StrictMode>
)
