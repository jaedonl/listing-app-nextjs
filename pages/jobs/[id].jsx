import React, {useState, useEffect} from 'react'
import Head from 'next/head'
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router'
import axios from 'axios'
import styles from "../../styles/Job.module.scss";
import JobInfo from '../../components/JobInfo'

const Job = ({jobData}) => {
    const [job, setJob] = useState(jobData)    
    const router = useRouter()

    useEffect(() => {
        const updateViews = async () => {
            await axios.put(`http://localhost:3000/api/jobs/${router.query.id}`, { views : jobData.views + 1})
        }
        updateViews()
    }, [])

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
            
            <section className={styles.job_section}>
                <JobInfo jobData={jobData} />
            </section>                        
        </main>
    )
}


export const getServerSideProps = async ({params}) => {                   
    const param = params.id    
    const job_res = await axios.get(`http://localhost:3000/api/jobs/${param}`)      
    
    return {
        props: {
            jobData: job_res.data
        },
    }
}

export default Job