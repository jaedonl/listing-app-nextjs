import React, {useState, useEffect} from 'react'
import Head from 'next/head'
import styles from "../styles/Account.module.scss";
import { useRouter } from 'next/router';
import { useSession, signOut } from "next-auth/react"
import { useSelector, useDispatch } from 'react-redux';
import { loggingOut} from '../redux/auth/authSlice';
import axios from 'axios';
import Moment from 'react-moment';

const account = () => {    
    const [jobs, setJobs] = useState(null)
    const [housings, setHousings] = useState(null)
    const { data: session } = useSession()        
    const router = useRouter()
    const authUser = useSelector(state => state.auth)    
    const dispatch = useDispatch()

    useEffect(() => {
        if (!session && !authUser.user) router.push('/auth/login')            
        
        if (session) {
            console.log(session)        
            const myJobPosts = async () => {
                const res = await axios.get(`http://localhost:3000/api/jobs`, 
                    { params: { author: session.user.id } }
                )                
                setJobs(res.data)
            }
            myJobPosts()
        }

        if (authUser.user) {
            console.log(authUser)            
            const myJobPosts = async () => {
                const res = await axios.get(`http://localhost:3000/api/jobs`, 
                    { params: { author: authUser.user._id } }
                )                
                setJobs(res.data)
            }
            myJobPosts()
        }                

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
                <section className={styles.account_header}>
                    <h1>My Account</h1>
                    <h2>Hi, { session ? session.user.name.split(' ')[0] : authUser.user.firstname }</h2>
                    You are signed in as { session ? session.user.email : authUser.user.email } <br />
                    
                    <button onClick={handleSignOut}>Sign out</button>
                </section>
            )}
            
            <section className={styles.my_posts}>
                <h2>Your posts</h2>

                <div className={styles.post_type}>
                    <h3 className={styles.post_type_title}>Jobs</h3>        
                    <ul className={styles.post_list}>                         
                    { jobs && jobs.map((job) => (
                        <li key={job._id} className={styles.post_listitem}>
                            <article>
                                <h4 className={styles.job_title}>{job.title}</h4> 
                                <Moment date={job.createdAt} format="MM/DD/YYYY" className={styles.post_date} />
                                <p className={styles.job_desc}>{job.desc}</p>
                                <p className={styles.job_tags}>
                                    {job.tags.map((tag, idx) => {
                                        let last = job.tags.length-1
                                        return (<span key={idx}>{tag}{ idx === last ? '' : ','} </span>)
                                    })}  
                                </p>
                                
                                <div>
                                    <button>Edit</button>
                                    <button>Delete</button>
                                </div>
                            </article>
                        </li>
                    )) }     
                    </ul>                    
                </div>                
                
            </section>
            
        </main>
    )
}

export default account