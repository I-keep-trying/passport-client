import React from 'react'
import Highlight, { defaultProps } from 'prism-react-renderer'
import dracula from 'prism-react-renderer/themes/dracula'

const exampleCode = `
//client Basic.js
(function someDemo() {
  var test = "Hello World!";
  console.log(test);
})();

return () => <App />;
`
const App = () => {
  return (
    <>
      <Highlight
        {...defaultProps}
        theme={dracula}
        code={exampleCode}
        language="jsx"
      >
        {({ tokens, getLineProps, getTokenProps }) => (
          <pre>
            {tokens.map((line, i) => (
              <div {...getLineProps({ line, key: i })}>
                {line.map((token, key) => (
                  <span {...getTokenProps({ token, key })} />
                ))}
              </div>
            ))}
          </pre>
        )}
      </Highlight>
      <pre>
        <code class="language-js">console.log("Hello World")</code>
      </pre>
    </>
  )
}

export default App
