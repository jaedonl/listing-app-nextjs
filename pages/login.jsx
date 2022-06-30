import React, {useState, useEffect} from 'react'
import Head from 'next/head'
import Link from 'next/link';
import styles from "../styles/Login.module.scss";

const login = () => {

    const handleSubmit = async (e) => {    
        e.preventDefault()    
        // await login(dispatch, { email, password})        
    }  

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
                    <p>Sign in and check out our universal listings </p>

                    <div className={styles.input_wrapper}>
                        <label for="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            // value={email}
                            placeholder="Email"
                            // onChange={onChange}
                            aria-label="input email"
                            className={styles.form_input}
                        />
                    </div>
                    <div className={styles.input_wrapper}>
                        <label for="pasword">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            // value={password}
                            placeholder="Password"
                            // onChange={onChange}
                            aria-label="input password"
                            className={styles.form_input}
                        />
                    </div>

                    <a href="#">Forgot password?</a>

                    <div>
                        <button type="button" onClick={handleSubmit} aria-label="sign in button">SUBMIT</button>
                    </div>                    
                    <div className={styles.login_or_social}>
                        <span>or</span>
                    </div>
                    <button type="button" onClick={handleSubmit} aria-label="social login button">Sign with Github</button>
                </form>       

                <div>
                    New to JdonL? <Link href="/register">Join now</Link>
                </div>
            </section>            
        </main>
    )
}

export default login