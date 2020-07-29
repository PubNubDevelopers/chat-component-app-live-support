import styled from 'styled-components'

// Create a Wrapper component that'll render a <section> tag with some styles
export const ChatDemoWrapper = styled.div`
  @font-face {
    font-family: 'Roboto', sans-serif;
    src: local('Roboto'), url(fonts/Roboto.woff) format('woff');
  }
  opacity: 1;
  -webkit-background-size: contain;
  -moz-background-size: contain;
  -o-background-size: contain;
  background: black;
  z-index: 1;
  margin: none;
  height: 100%;
  width: 100%;
`
