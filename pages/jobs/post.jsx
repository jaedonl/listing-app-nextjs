import React, {useState, useEffect} from 'react'
import Head from 'next/head'
import styles from "../../styles/Post.module.scss";
import { useRouter } from 'next/router';
import { useSession } from "next-auth/react"
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios';

const post = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(false)
    const [errorMessage, setErrorMessage] = useState(null)
    
    const handleInputFocus = (e) => {
        const elem = document.activeElement
        const label = document.querySelector(`label[for=${elem.getAttribute('id')}]`)
        
        if (e.target === elem && label.classList.contains(`${styles.input_focus}`) === false) {
            label.classList.add(`${styles.input_focus}`)
        }                        
    }

    const handleSubmit = async (e) => {    
        e.preventDefault()            
    }    

    return (
        <main className={styles.post_template}>
            <section className={styles.form_container}>                
                <form className={styles.post_form}>
                    <h1>Post job</h1>

                    <div className={styles.input_wrapper}>
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"                            
                            placeholder="Email"                            
                            aria-label="input email"
                            className={styles.form_input}
                            onClick={handleInputFocus}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        {error && (errorMessage === 'Wrong email.' || errorMessage === 'Please input email.') && <span className={styles.error_message}>{errorMessage}</span>}           
                    </div>

                    <div className={styles.post_btn_wrapper}>
                        <button type="button" aria-label="post button" className={styles.post_btn} onClick={handleSubmit}>Post</button>
                    </div>
                </form>
            </section>
        </main>
    )
}

export default post