import { createGlobalStyle, ThemeProvider, } from 'styled-components'
import styled from 'styled-components'
import Footer from './Footer'
import Header from './Header'
import Navbar from './navbar'

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
`

interface ThemeInterface {
  colors: {
    primary: string
  }
}

const theme: ThemeInterface = {
  colors: {
    primary: '#a05ed6',
  },
}
const site = true
export default function Layout({ children }) {
  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        {site && <Navbar />}
        <Main>{children}</Main>
        {site && <Footer />}
      </ThemeProvider>
    </>
  )
}

// create style for main
const Main = styled.main`
    padding: 20px;
`;