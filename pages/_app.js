import Layout from "../components/Layout";
import '../styles/globals.css'
import { SessionProvider } from "next-auth/react"
import { Provider } from 'react-redux'
import { store, persistor } from '../redux/store'
import { PersistGate } from 'redux-persist/integration/react';
import { useRouter } from "next/router";

function MyApp({ Component, pageProps: { session, ...pageProps} }) {
    const router = useRouter()
    
    return (
        <SessionProvider session={session}>
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                    { router.pathname === '/auth/login' ? (
                            <Component {...pageProps} />
                        ) : (
                            <Layout>
                                <Component {...pageProps} />
                            </Layout>                     
                        )}                    
                </PersistGate>
            </Provider>
        </SessionProvider>
    )
}

export default MyApp
