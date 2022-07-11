import React, {useState, useEffect} from 'react'
import Head from 'next/head'
import styles from "../styles/Account.module.scss";
import { useRouter } from 'next/router';
import { useSession, signOut } from "next-auth/react"
import { useSelector, useDispatch } from 'react-redux';
import { loggingOut} from '../redux/auth/authSlice';

const account = () => {
    const { data: session, status } = useSession()        
    const router = useRouter()
    const authUser = useSelector(state => state.auth)    
    const dispatch = useDispatch()

    useEffect(() => {
        if (!session && !authUser.user) {
            router.push('/auth/login')
        }      
        
        if (session) console.log(session)        
        if (authUser) console.log(authUser)        
    }, [session, authUser])

    const handleSignOut = async () => {
        if (session) {
            const data = await signOut({ redirect: false, callbackUrl: `/auth/login`})
            router.push(data.url)

        } else if (authUser.user) {
            dispatch(loggingOut())
        }
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
            
            <section>
                {/* <ul>
                    { authUser && authUser?.jobs.map((job, idx) => (
                        <li>{job}</li>
                    )) }
                </ul> */}

                <ul>
                    { session && session.user.posts?.jobs.map((job, idx) => (
                        <li>{job}</li>
                    )) }
                </ul>                 
            </section>
            
        </main>
    )
}


export const getServerSideProps = async ({params, query}) => {                   
    
    // const param = params.id    
    // const job_res = await axios.get(`http://localhost:3000/api/jobs/${param}`)      
    
    return {
        props: {
            // jobData: job_res.data
        },
    }
}

export default account