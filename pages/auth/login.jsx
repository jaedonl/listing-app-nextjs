import React, {useState, useEffect} from 'react'
import Head from 'next/head'
import Link from 'next/link';
import styles from "../../styles/Login.module.scss";
import { useSession, signIn, signOut } from "next-auth/react"
import { useRouter } from 'next/router';
import {GitHub, Google} from '@mui/icons-material';

const providers = [
    {
        name: 'github',
        Icon: GitHub,
        color: '#967bb6',
    },
    {
        name: 'google',
        Icon: Google,
        color: '#eb4034',
    },
]    


const login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { data: session } = useSession()
    const router = useRouter()

    useEffect(() => {
        if (session !== 'loading' && session) {
            router.push('/account')
        }
    }, [session])

    const handleInputFocus = (e) => {
        const elem = document.activeElement
        const label = document.querySelector(`label[for=${elem.getAttribute('id')}]`)
        
        if (e.target === elem && label.classList.contains(`${styles.input_focus}`) === false) {
            label.classList.add(`${styles.input_focus}`)
        }                        
    }
    
    const handleOAuthSignIn = (provider) => () => signIn(provider)

    const handleSubmit = async (e) => {    
        e.preventDefault()    

        if (!email) return false
		signIn('email', { email, redirect: false })
    }
    

    useEffect(() => {
        const emailLabel = document.querySelector('label[for="email"]')
        const passwordLabel = document.querySelector('label[for="password"]')

        email.length > 0 ? emailLabel.classList.add(`${styles.input_focus}`) : emailLabel.classList.remove(`${styles.input_focus}`)
        password.length > 0 ? passwordLabel.classList.add(`${styles.input_focus}`) : passwordLabel.classList.remove(`${styles.input_focus}`)
    }, [email, password])

    return (
        <main className={styles.login_template}>
            <Head>
                <title>Login to JdonL</title>
                <meta name="description" content="Login page" />
                <link rel="icon" href="/favicon.ico" />
            </Head>            
            <h1 className={styles.home_link}>
                <Link href="/">JdonL</Link>
            </h1>
            <section className={styles.form_container}>                
                <form className={styles.login_form}>
                    <h1>Sign in</h1>
                    <p>Sign in and check out our listings </p>

                    <div className={styles.input_wrapper}>
                        <label for="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"                            
                            placeholder="Email"                            
                            aria-label="input email"
                            className={styles.form_input}
                            // value={email}
                            onClick={handleInputFocus}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className={styles.input_wrapper}>
                        <label for="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"                            
                            placeholder="Password"                            
                            aria-label="input password"
                            className={styles.form_input}
                            // value={password}
                            onClick={handleInputFocus}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <a href="#" className={styles.forgot_password}>Forgot password?</a>

                    <div className={styles.signin_btn_wrapper}>
                        <button type="button" aria-label="sign in button" className={styles.signin_btn} onClick={handleSubmit}>Sign in</button>
                    </div>

                    <div className={styles.alternate_signin_container}>
                        <div className={styles.or}>
                            <span>or</span>
                        </div>
                        <div className={styles.social_btn_container}>
                            { providers.map(({name, Icon, color}) => (
                                <button type="button" aria-label="social login button" 
                                    className={`${styles.social_btn}`} 
                                    onClick={handleOAuthSignIn(name)}>                                        
                                    <Icon/> <span>{name}</span>
                                </button>
                                // <div className={styles.social_btn_wrapper} key={provider}>
                                //     <button type="button" aria-label="social login button" className={styles.social_btn} 
                                //     onClick={handleOAuthSignIn(provider)}>{provider} sign in</button>
                                // </div> 
                            ))}
                        </div>
                        
                        {/* <div className={styles.social_btn_wrapper}>
                            <button type="button" aria-label="social login button" className={styles.social_btn} 
                            onClick={()=>signin('github')}>Github sign in</button>
                        </div>          
                        <div className={styles.social_btn_wrapper}>
                            <button type="button" aria-label="social login button" className={styles.social_btn} 
                            onClick={()=>signin('google')}>Google sign in</button>
                        </div>    */}
                    </div>                    
                              
                </form>       

                <div className={styles.register_link}>
                    New to JdonL? <Link href="/register">Join now</Link>
                </div>
            </section>            
        </main>
    )
}

export default login