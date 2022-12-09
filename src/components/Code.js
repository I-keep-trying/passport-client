import React, { useState, Fragment } from 'react'
import {
  useClipboard,
  Container,
  Flex,
  Spacer,
  Button,
  Box,
} from '@chakra-ui/react'
import Highlight, { defaultProps } from 'prism-react-renderer'
import theme from 'prism-react-renderer/themes/synthwave84'

const exampleCode = `
// Editor
(function someDemo() {
  var test = "Hello World!";
  console.log(test);
})();

return () => <App />;
`
export const Code = () => {
  const { hasCopied, onCopy } = useClipboard(exampleCode)

  return (
    <Container>
      <Flex>
        <Spacer />
        <Button
          size="xs"
          variant="outline"
          colorScheme="orange"
          zIndex={2}
          onClick={onCopy}
          mt={5}
          mb={-20}
          mr={5}
        >
          {hasCopied ? 'Copied' : 'Copy'}
        </Button>
      </Flex>
      <Highlight {...defaultProps} theme={theme} code={exampleCode} language="jsx">
        {({ tokens, getLineProps, getTokenProps }) => (
          <Fragment>
            {tokens.map((line, i) => (
              <div {...getLineProps({ line, key: i })}>
                {line.map((token, key) => (
                  <span {...getTokenProps({ token, key })} />
                ))}
              </div>
            ))}
          </Fragment>
        )}
      </Highlight>
    </Container>
  )
}
