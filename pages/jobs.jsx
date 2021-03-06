import React, {useState, useEffect} from 'react'
import Head from 'next/head'
import Image from 'next/image';
import Link from 'next/link';
import styles from "../styles/Jobs.module.scss";
import SearchBar from '../components/SearchBar';
import JobInfo from '../components/JobInfo';
import axios from 'axios';
import { FavoriteBorder, Favorite } from '@mui/icons-material';
import { useRouter } from 'next/router';
import Moment from 'react-moment';
import ReactPaginate from 'react-paginate';


const jobs = ({jobs}) => {
    const router = useRouter()        
    const [list, setList] = useState(jobs)
    const [current, setCurrent] = useState(jobs[0])   
    const [pageNumber, setPageNumber] = useState(0);
    const listPerPage = 10;
    const pageVisted = pageNumber * listPerPage;    

    var displayLists, pageCount;
    if (list) {
        displayLists = list.slice(pageVisted, pageVisted + listPerPage);
        pageCount = Math.ceil(list.length / listPerPage)
    }
    const changePage = ({selected}) => setPageNumber(selected) 
    

    const currentListHandle = (e, idx) => {       
        setCurrent(displayLists[idx])

        var items = document.querySelectorAll(`.${styles.list_item}`)             
        items.forEach(item => {
            if (item.classList.contains(`${styles.current}`)) {
                item.classList.remove(`${styles.current}`)
            }
        });
        e.currentTarget.classList.add(`${styles.current}`) 

        router.push(`/jobs?current=${displayLists[idx]._id}`)         
    }

    useEffect(() => {        
        var items = document.querySelectorAll(`.${styles.list_item}`)
        items[0].classList.add(`${styles.current}`)
        router.push(`/jobs?current=${jobs[0]._id}`) 
    }, [])
    

    return (
        <main className={styles.jobs_template}>
            <Head>
                <title>Jobs Listing | job description</title>
                <meta name="description" content="list of jobs" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <section className={styles.search_and_post}>
                <SearchBar />              
                <div className={styles.post_link_wrapper}>
                    <Link href="/jobs/newpost"><a className={styles.link}>Post new job</a></Link>
                </div>                
            </section>            

            <section className={styles.joblist_section}>
                <section className={styles.list}>
                    <ul>
                        {list && 
                        displayLists.map((job, idx) => (
                            <li key={job._id} id={job._id} className={styles.list_item} 
                                onClick={(e) => currentListHandle(e, idx)}>
                                <div className={styles.image_wrapper}>
                                    { !job.img ? <Image src="/assets/images/jobs/default-image.png" layout="fill" objectFit="cover" className={styles.image} />
                                    : <Image src={job.img} layout="fill" objectFit="cover" className={styles.image} />
                                    }                                    
                                </div>
                                <div className={styles.job_info}>
                                    <h2 className={styles.job_title}>{job.title}</h2>
                                    <span className={styles.company}>{job.company}</span>
                                    <span className={styles.location_commute}>{job.location} ({job.commute_type})</span>
                                    <span className={styles.pay}>${job.pay}</span>
                                    <Moment date={job.createdAt} format="MM/DD/YY" className={styles.post_date} />
                                </div>        
                                
                                <FavoriteBorder />
                            </li>   
                        ))}
                    </ul>               

                    <div className={styles.pagination_wrapper}>
                        {list && <ReactPaginate 
                            previousLabel={"Prev"}
                            nextLabel={"Next"}
                            pageCount={pageCount}
                            onPageChange={changePage}
                            containerClassName={styles.paginationBttns}
                            previousLinkClassName={styles.previousBttn}
                            nextLinkClassName={styles.nextBttn}
                            disabledClassName={styles.paginationDisabled}
                            activeClassName={styles.paginationActive} />}
                    </div>        
                </section>
                
                <section className={styles.preview}>          
                    <JobInfo jobData={current} />                  
                </section>
            </section>
        </main>
    )
}

export const getServerSideProps = async () => {         
    const jobs_res = await axios.get('http://localhost:3000/api/jobs')                 
    
    return {
        props: {
            jobs: jobs_res.data,      
        },
    }
}

export default jobs