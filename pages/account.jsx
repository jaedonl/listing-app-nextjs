import React, {useState, useEffect} from 'react'
import Head from 'next/head'
import styles from "../styles/Account.module.scss";
import { useRouter } from 'next/router';
import { useSession, signIn, signOut } from "next-auth/react"

const account = () => {
    const { data: session, status } = useSession()
    const router = useRouter()

    console.log(session, status);

    useEffect(() => {
        if (status !== 'loading' && !session) {
            router.push('/auth/login')
        }

        if (session !== 'loading' && session) {
            router.push('/account')
        }
    }, [session])

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

            { session && (
                <section>
                    account
                </section>        
            )}
            {session && ( 
                <>
                    You are signed in as {session.user.email} <br />
                    <button onClick={handleSignOut}>Sign out</button>
                </>
            )}
            
        </main>
    )
}

export default account