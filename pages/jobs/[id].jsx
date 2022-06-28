import React, {useState, useEffect} from 'react'
import Head from 'next/head'
import Link from 'next/link';
import Image from 'next/image';
import axios from 'axios'
import styles from "../../styles/Job.module.scss";

const Job = ({jobData}) => {
    const [job, setJob] = useState(jobData)    

    return (
        <main className={styles.job_template}>
            <Head>
                <title>{job.company} | job description</title>
                <meta name="description" content={`Job description page for ${job.company}`} />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <nav className={styles.breadcrumb}>
                <ul>                        
                    <li><Link href="/jobs"><a>jobs</a></Link><span>/</span></li>
                    <li>{job.title}</li>
                </ul>
            </nav>
            
            <section className={styles.job_info}>                
                <div className={styles.job_heading}>
                    <h1>{job.title}</h1>
                    <div className={styles.title_flex}>
                        <div className={styles.image_wrapper}>                            
                            <Image src={job.img[0]} layout="fill" objectFit="cover" className={styles.image} />
                        </div>            
                        <div>
                            <h2>{job.company}</h2>      
                        </div>                        
                    </div>                    
                </div>                                
            </section>            
        </main>
    )
}


export const getServerSideProps = async ({params, query}) => {               
    console.log(query)
    const param = params.id    
    const job_res = await axios.get(`http://localhost:3000/api/jobs/${param}`)      
    
    return {
        props: {
            jobData: job_res.data
        },
    }
}

export default Job