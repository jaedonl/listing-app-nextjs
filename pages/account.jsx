import React, {useState, useEffect} from 'react'
import Head from 'next/head'
import styles from "../styles/Account.module.scss";
import { useRouter } from 'next/router';
import { useSession, signIn, signOut } from "next-auth/react"
import { useSelector } from 'react-redux';

const account = () => {
    const { data: session, status } = useSession()
    const router = useRouter()
    const authUser = useSelector(state => state.auth)

    console.log(session, status);

    useEffect(() => {
        // if ((status !== 'loading' && !session) || !authUser.user) {
        //     router.push('/auth/login')
        // }

        // if (session !== 'loading' && session) {
        //     router.push('/account')
        // }
        console.log(session, authUser);
    }, [session, authUser])

    const handleSignOut = async () => {
        const data = await signOut({ redirect: false, callbackUrl: '/account'})
        router.push(data.url)
    }

    return (
        <main className={styles.account_template}>
            <Head>
                <title>My account | JdonL</title>
                <meta name="description" content="my account page" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            { (session || authUser.user) && (
                <section>
                    account
                </section>        
            )}
            { (session || authUser.user) && ( 
                <>
                    You are signed in as { session ? session.user.email : authUser.user.email } <br />
                    <button onClick={handleSignOut}>Sign out</button>
                </>
            )}
            
        </main>
    )
}

export default account