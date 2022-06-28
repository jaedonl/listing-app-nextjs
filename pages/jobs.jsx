import React, {useState, useEffect} from 'react'
import Head from 'next/head'
import Image from 'next/image';
import Link from 'next/link';
import styles from "../styles/Jobs.module.scss";
import SearchBar from '../components/SearchBar';
import axios from 'axios';
import { FavoriteBorder, Favorite } from '@mui/icons-material';

const jobs = ({jobs}) => {
    const [list, setList] = useState(jobs)
    const [current, setCurrent] = useState(jobs[0])    

    const currentListHandle = (e, idx) => {               
        var items = document.querySelectorAll(`.${styles.list_item}`)     
        
        items.forEach(item => {
            if (item.classList.contains(`${styles.current}`)) {
                item.classList.remove(`${styles.current}`)
            }
        });
        e.currentTarget.classList.add(`${styles.current}`)        
    }
    useEffect(() => {
        var items = document.querySelectorAll(`.${styles.list_item}`)
        items[0].classList.add(`${styles.current}`)
    }, [current])

    return (
        <main className={styles.jobs_template}>
            <Head>
                <title>Jobs Listing | job description</title>
                <meta name="description" content="list of jobs" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
                        
            <SearchBar />              

            <div className={styles.joblist_section}>
                <section className={styles.list}>
                    <ul>
                        {list.map((job, idx) => (
                            <li key={job._id} id={job._id} className={styles.list_item} onClick={(e)=>currentListHandle(e, idx)}>
                                <div className={styles.image_wrapper}>
                                    <Image src={job.img[0]} layout="fill" objectFit="cover" className={styles.image} />
                                </div>
                                <div className={styles.job_info}>
                                    <h2 className={styles.job_title}>{job.title}</h2>
                                    <span className={styles.company}>{job.company}</span>
                                    <span className={styles.location_commute}>{job.location} ({job.commute_type})</span>
                                    <span className={styles.pay}>${job.pay}</span>
                                </div>        
                                
                                <FavoriteBorder />
                            </li>   
                        ))}
                    </ul>
                </section>
                
                <section className={styles.preview}>
                    
                </section>
            </div>
        </main>
    )
}

export const getServerSideProps = async (context) => {         
    const jobs_res = await axios.get('http://localhost:3000/api/jobs')                 
    
    return {
        props: {
            jobs: jobs_res.data,      
        },
    }
}

export default jobs