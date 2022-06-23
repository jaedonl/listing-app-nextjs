import { useState, useEffect } from 'react'
import styles from "../styles/TrendingNew.module.scss";
import Link from 'next/link';

const TrendingNew = ({jobs, jobs2, housings}) => {       
    const [tab, setTab] = useState('jobs')
    const [jobList, setJobList] = useState(jobs)    
    const [housingList, setHousingList] = useState()
    
    const [trendingJobs, setTrendingJobs] = useState()
    const [trendingHousings, setTrendingHousings] = useState()
    
    const [newestJobs, setNewestJobs] = useState()
    const [newestHousings, setNewestHousings] = useState()    

    useEffect(() => {           
        var listingTabs = document.querySelectorAll(`.${styles.tab}`)        

        listingTabs.forEach(listTab => {
            listTab.getAttribute('name') === tab 
                ? listTab.classList.add(`${styles.current}`) 
                : listTab.classList.remove(`${styles.current}`)            
        });
    }, [tab])    

    useEffect(() => {                         
        setTrendingJobs(jobs.sort((a, b) => (b.views > a.views) ? 1 : -1))        
        setTrendingHousings(housings?.sort((a, b) => (a.views > b.views) ? 1 : -1))

        setNewestJobs(jobs2.sort((a, b) => (b.createdAt > a.createdAt) ? 1 : -1))
        setNewestHousings(housings?.sort((a, b) => (b.createdAt > a.createdAt) ? 1 : -1))                 
    }, [jobList, housingList])

    const formatter = () => {
        Intl.DateTimeFormat("en-GB", {
            year: "numeric",
            month: "long",
            day: "2-digit"
          });
    }

    return (
        <section className={styles.trending_new}>
            <h2>Trending / New</h2>

            <menu className={styles.listing_tab}>
                <li name="jobs" className={`${styles.tab} ${styles.current}`}>
                    <button type="button" name="jobs" onClick={(e) => {setTab(e.currentTarget.getAttribute('name'))}}>Job</button>
                </li>
                <li name="housings" className={styles.tab}>
                    <button type="button" name="housings" onClick={(e) => {setTab(e.currentTarget.getAttribute('name'))}}>Housing</button>
                </li>
                <li name="forsales" className={styles.tab}>
                    <button type="button" name="forsales" onClick={(e) => {setTab(e.currentTarget.getAttribute('name'))}}>For sale</button>
                </li>
                <li name="communities" className={styles.tab}>
                    <button type="button" name="communities" onClick={(e) => {setTab(e.currentTarget.getAttribute('name'))}}>Community</button>
                </li>
                <li name="qnas" className={styles.tab}>
                    <button type="button" name="qnas" onClick={(e) => {setTab(e.currentTarget.getAttribute('name'))}}>QnA</button>
                </li>                
            </menu>

            <div className={styles.listing_grid}>
                <div className={styles.listing}>
                    <h3>Hot listing</h3>
                    <ul>
                        { trendingJobs?.map((job, idx) => (
                            <li key={idx}>
                                <Link href={`/jobs/${job._id}`}>
                                    <a>
                                        <span className={styles.job_title}>{job.title}</span>
                                        <span className={styles.job_company}>– {job.company}</span>
                                        <span> ({job.views})</span>
                                    </a>
                                </Link>
                            </li>
                        ))}                                            
                    </ul>   
                </div> 

                <div  className={styles.listing}>
                    <h3>New listing</h3>
                    <ul>
                        { newestJobs?.map((job, idx) => {
                            

                            return (
                            <li key={idx}>
                                <Link href={`/jobs/${job._id}`}>
                                    <a>
                                        <span className={styles.job_title}>{job.title}</span>
                                        <span className={styles.job_company}>– {job.company}</span>
                                        <p>– {job.createdAt}</p>
                                    </a>
                                </Link>
                            </li>
                            )
                        })}                        
                    </ul>   
                </div>                 
            </div>  
        </section>
    )
}

export default TrendingNew