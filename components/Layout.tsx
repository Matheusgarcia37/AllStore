import { createGlobalStyle, ThemeProvider, } from 'styled-components'
import { useRouter } from 'next/router';
import api from '../api/api';
import styled from 'styled-components'
import Footer from './Footer'
import Navbar from './navbar'
import { useEffect, useState } from 'react'

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
`

interface ThemeInterface {
  colors: {
    primary: string,
    secondary: string
  }
}

// const theme: ThemeInterface = {
//   colors: {
//     primary: '#161616',
//     secondary: '#fff'
//   },
// }

export default function Layout({ children }) {
  const router = useRouter();
  const NameStore = router.query.store;

  const [theme, setTheme] = useState({
    colors: {
      primary: '#161616',
      secondary: '#fff'
    },
  })
  const [isStore, setIsStore] = useState(false)

  useEffect(() => {
    const configStore = async () => {
      const existStore = localStorage.getItem('store');
      if(!existStore){
        if (NameStore) {
          try {
            const { data: store } = await api.get(`/store/${NameStore}`);
            console.log(store)
            setTheme({
              colors: {
                primary: `Rgb(${store.Theme.primaryColor})`,
                secondary: `Rgb(${store.Theme.secondaryColor})`
              }
            })
            localStorage.setItem("store", JSON.stringify(store))
            setIsStore(true)
          } catch (error) {
            console.log(error);
          }
        }
      } else {
        if(NameStore){
          const store = JSON.parse(existStore);
          if(store.name !== NameStore){
            localStorage.removeItem("store")
            configStore()
          } else {
            setTheme({
              colors: {
                primary: `Rgb(${store.Theme.primaryColor})`,
                secondary: `Rgb(${store.Theme.secondaryColor})`
              }
            })
            setIsStore(true)
          } 
        }
      }
    }
    configStore()
  }, [NameStore])

  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        {isStore && <Navbar />}
        <Main>{children}</Main>
        {isStore && <Footer />}
      </ThemeProvider>
    </>
  )
}

// create style for main
const Main = styled.main`
    padding: 20px;
`;