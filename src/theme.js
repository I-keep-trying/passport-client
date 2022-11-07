import { extendTheme } from '@chakra-ui/react'
import { mode, StyleFunctionProps } from '@chakra-ui/theme-tools'

const config = {
  initialColorMode: 'dark',
  useSystemColorMode: true,
}

const theme = extendTheme({
  config,
  colors: {
    pb_red: { 200: '#9b2c2c' },
    pb_orange: { 200: '#dd6b20' },
    pb_orange2: { 200: '#d69e2e' },
    pb_yellow: { 200: '#e6e600' },
    pb_green: { 200: '#00cc00' },
  },
  components: {
    Progress: {
      baseStyle: (props: StyleFunctionProps) => {
        const { colorScheme: c } = props
        return {
          filledTrack: {
            bgColor: mode(`${c}.500`, `${c}.600`)(props),
          },
        }
      },
    },
  },
})

export default theme
