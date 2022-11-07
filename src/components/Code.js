import React, { useState, Fragment } from 'react'
import {
  useClipboard,
  Container,
  Flex,
  Spacer,
  Button,
  Box,
} from '@chakra-ui/react'
import Editor from 'react-simple-code-editor'
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

const styles = {
  root: {
    //  marginTop: '10px',
    // boxSizing: 'border-box',
    fontFamily: '"Dank Mono", "Fira Code", monospace',
    ...theme.plain,
  },
}

export const Code = () => {
  // const [code, setCode] = useState(exampleCode)rgb(0, 0, 0)
  const { hasCopied, onCopy } = useClipboard(exampleCode)

  const highlight = (code) => (
    <Highlight {...defaultProps} theme={theme} code={code} language="jsx">
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
  )

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
      <Editor
        value={exampleCode}
        highlight={highlight}
        padding={10}
        style={styles.root}
      />
    </Container>
  )
}
