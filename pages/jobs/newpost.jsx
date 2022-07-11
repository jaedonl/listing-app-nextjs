import React, {useState, useEffect} from 'react'
import Head from 'next/head'
import styles from "../../styles/Newpost.module.scss";
import { useRouter } from 'next/router';
import { useSession } from "next-auth/react"
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios';

const post = () => {
    const [inputs, setInputs] = useState({});
    const [selectedImage, setSelectedImage] = useState(null);
    const [error, setError] = useState(false)
    const [errorMessage, setErrorMessage] = useState(null)
    const { data: session } = useSession()
    const authUser = useSelector(state => state.auth)    

    const handleChange = (e) => {
        let updatedValue = e.target.value

        // if (e.target.name === 'img') {
        //     if (updatedValue === '')
        //     setInputs((prev) => {
        //         return {...prev, [e.target.name]: '/assets/images/jobs/default-image.png'}
        //     })
        // }

        if (e.target.name === 'tags') {
            updatedValue = e.target.value.split(',')
            setInputs((prev) => {
                return {...prev, [e.target.name]: updatedValue}
            })
        }

        if (e.target.name === 'sponsorship' && e.target.value === 'true') {
            updatedValue = JSON.parse(e.target.value)
            setInputs((prev) => {
                return {...prev, [e.target.name]: updatedValue}
            })
        } else if (e.target.name === 'sponsorship' && e.target.value === 'false') {
            updatedValue = JSON.parse(e.target.value)
            setInputs((prev) => {
                return {...prev, [e.target.name]: updatedValue}
            })
        }   

        setInputs((prev) => {
            return {...prev, [e.target.name]: updatedValue}
        })
    }


    const handleSubmit = async (e) => {    
        e.preventDefault()            
        setInputs((prev) => {
            return {...prev, author: authUser.user._id}
        })
        try {
            const res = await axios.post('http://localhost:3000/api/jobs', inputs);

        } catch (error) {
            console.log(error)
        }
    }    

    useEffect(() => {
        console.log(inputs)
    }, [inputs])

    return (
        <main className={styles.post_template}>        
            <section className={styles.form_container}>                
                <form className={styles.post_form}>
                    <h1>Post job</h1>                    

                    <div className={styles.input_wrapper}>
                        <label htmlFor="title">Title</label>
                        <input
                            type="text"
                            id="title"
                            name="title"                            
                            placeholder="Title"                            
                            aria-label="input title"
                            className={styles.form_input}
                            onChange={handleChange}
                        />
                        {error && errorMessage === 'Please input title.' && <span className={styles.error_message}>{errorMessage}</span>}           
                    </div>

                    <div className={styles.input_wrapper}>
                        <label htmlFor="company">Company</label>
                        <input
                            type="text"
                            id="company"
                            name="company"                            
                            placeholder="Company"                            
                            aria-label="input company"
                            className={styles.form_input}
                            onChange={handleChange}
                        />
                        {error && errorMessage === 'Please input company.' && <span className={styles.error_message}>{errorMessage}</span>}           
                    </div>

                    <div className={styles.input_wrapper}>
                        <label htmlFor="location">location</label>
                        <input
                            type="text"
                            id="location"
                            name="location"                            
                            placeholder="location"                            
                            aria-label="input location"
                            className={styles.form_input}
                            onChange={handleChange}
                        />
                        {error && errorMessage === 'Please input location.' && <span className={styles.error_message}>{errorMessage}</span>}           
                    </div>

                    <div className={styles.input_wrapper}>
                        <label htmlFor="description">Description</label>
                        <input
                            type="text"
                            id="desc"
                            name="desc"                            
                            placeholder="Description"                            
                            aria-label="input description"
                            className={styles.form_input}
                            onChange={handleChange}
                        />
                        {error && errorMessage === 'Please input description.' && <span className={styles.error_message}>{errorMessage}</span>}           
                    </div>

                    <div className={styles.input_wrapper}>
                        <label htmlFor="pay">Pay</label>
                        <input
                            type="text"
                            id="pay"
                            name="pay"                            
                            placeholder="Pay"                            
                            aria-label="input pay"
                            className={styles.form_input}
                            onChange={handleChange}
                        />
                        {error && errorMessage === 'Please input pay.' && <span className={styles.error_message}>{errorMessage}</span>}           
                    </div>

                    <div className={styles.input_wrapper}>
                        <label htmlFor="job_type">Job type</label>
                        <input
                            type="text"
                            id="job_type"
                            name="job_type"                            
                            placeholder="Job type"                            
                            aria-label="input job type"
                            className={styles.form_input}
                            onChange={handleChange}
                        />
                        {error && errorMessage === 'Please input job type.' && <span className={styles.error_message}>{errorMessage}</span>}           
                    </div>

                    <div className={styles.input_wrapper}>
                        <label htmlFor="commute_type">Commute type</label>
                        <input
                            type="text"
                            id="commute_type"
                            name="commute_type"                            
                            placeholder="Commute type"                            
                            aria-label="input commute type"
                            className={styles.form_input}
                            onChange={handleChange}
                        />
                        {error && errorMessage === 'Please input job type.' && <span className={styles.error_message}>{errorMessage}</span>}           
                    </div>

                    <div className={styles.input_wrapper}>
                        <label htmlFor="sponsorship">Sponsorship</label>
                        <select type="select" id="sponsorship" name="sponsorship" aria-label="input sponsorship"
                        defaultValue="true" onChange={handleChange}>                            
                            <option value="true" selected>Sponsorship</option>
                            <option value="false">No sponsorship</option>
                        </select>
                        {error && errorMessage === 'Please input pay.' && <span className={styles.error_message}>{errorMessage}</span>}           
                    </div>
                    
                    <div className={styles.input_wrapper}>
                        <label htmlFor="phone">Phone</label>
                        <input
                            type="tel"
                            id="phone"
                            name="phone"                            
                            placeholder="Phone"                            
                            aria-label="input phone"
                            className={styles.form_input}
                            onChange={handleChange}
                        />
                        {error && errorMessage === 'Please input phone.' && <span className={styles.error_message}>{errorMessage}</span>}           
                    </div>

                    <div className={styles.input_wrapper}>
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"                            
                            placeholder="Email"                            
                            aria-label="input email"
                            className={styles.form_input}
                            onChange={handleChange}
                        />
                        {error && (errorMessage === 'Wrong email.' || errorMessage === 'Please input email.') && <span className={styles.error_message}>{errorMessage}</span>}           
                    </div>

                    <div className={styles.input_wrapper}>
                        <label htmlFor="logo">Company logo</label>
                        <input
                            type="text"
                            id="logo"
                            name="img"                            
                            placeholder="Company logo URL"                            
                            aria-label="input logo"
                            className={styles.form_input}
                            onChange={handleChange}
                        />
                        {error && errorMessage === 'Please input logo URL.' && <span className={styles.error_message}>{errorMessage}</span>}           
                    </div>

                    <div className={styles.input_wrapper}>
                        <label htmlFor="tag">Tags</label>
                        <input
                            type="text"
                            id="tags"
                            name="tags"                            
                            placeholder="Please add comma for each tag words."                            
                            aria-label="input tags"
                            className={styles.form_input}
                            onChange={handleChange}
                        />
                        {error && errorMessage === 'Please input tags.' && <span className={styles.error_message}>{errorMessage}</span>}           
                    </div>

                    <div className={styles.input_wrapper}>
                        <label htmlFor="website">Company link</label>
                        <input
                            type="text"
                            id="website"
                            name="website"                            
                            placeholder="Company link"                            
                            aria-label="input website"
                            className={styles.form_input}
                            onChange={handleChange}
                        />
                        {error && errorMessage === 'Please input company link.' && <span className={styles.error_message}>{errorMessage}</span>}           
                    </div>

                    {/* <div className={styles.input_wrapper}>
                        <label htmlFor="logo">Company logo</label>
                        <input
                            type="file"
                            id="logo"
                            name="logo"    
                            accept="image/*"                                                    
                            aria-label="input pay"
                            className={styles.form_input}
                            onChange={(e) => setSelectedImage(e.target.files[0])}
                        />
                        {error && errorMessage === 'Please input pay.' && <span className={styles.error_message}>{errorMessage}</span>}           
                    </div> */}

                    <div className={styles.post_btn_wrapper}>
                        <button type="button" aria-label="post button" className={styles.post_btn} onClick={handleSubmit}>Post</button>
                    </div>
                    
                </form>
            </section>
        </main>
    )
}

export default post