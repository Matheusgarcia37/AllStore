import Layout from "../components/Layout"
import { AuthProvider } from "../contexts/AuthContext"
export default function App({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AuthProvider>
  )
}
