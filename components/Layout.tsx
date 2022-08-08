import { createGlobalStyle, ThemeProvider, } from 'styled-components'
import { useRouter } from 'next/router';
import api from '../api/api';
import styled from 'styled-components'
import Footer from './Footer'
import Navbar from './navbar'
import { useEffect, useState, createContext } from 'react'
import NavbarAdmin from './navbarAdmin';

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Roboto', sans-serif;
  }
`

interface ThemeInterface {
  colors: {
    primary: string,
    secondary: string
  }
}

interface StoreInterface {
  id: string,
  name: string,
  typeOfStore: string,
}

//criar contexto para store
export const StoreContext = createContext({} as any);
// const theme: ThemeInterface = {
//   colors: {
//     primary: '#161616',
//     secondary: '#fff'
//   },
// }


export function Layout({ children }) {
  const router = useRouter();
  const NameStore = router.query.store;
  const acessAdmin = router.pathname.includes("/admin");

  const [theme, setTheme] = useState({
    colors: {
      primary: '#161616',
      secondary: '#fff'
    },
  })
  const [store, setStore] = useState(null)

  useEffect(() => {
    const configStore = async () => {
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
          //localStorage.setItem("store", JSON.stringify(store))
          setStore(store)
        } catch (error) {
          console.log(error);
          setStore(null)
        }
      } else {
        setStore(null)
      }
     /*  const existStore = localStorage.getItem('store');
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
            setStore(store)
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
            setStore(store)
          } 
        }
      } */
    }
    configStore()
  }, [NameStore])

  return (
    <StoreContext.Provider value={store}>
      <GlobalStyle />
      { !acessAdmin ? (
        <ThemeProvider theme={theme}>
        {store && <Navbar />}
        <Main>{children}</Main>
        {store && <Footer />}
      </ThemeProvider>
      ) : (
        <NavbarAdmin>
          <Main>{children}</Main>
        </NavbarAdmin>
      )} 
      
    </StoreContext.Provider>
  )
}

const Main = styled.main`
padding: 15px;
`