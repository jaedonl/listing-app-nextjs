import { useState, useEffect } from 'react'
import styles from "../styles/TrendingNew.module.scss";
import Link from 'next/link';
import Moment from 'react-moment';

const TrendingNew = ({jobs, jobs2, housings, housings2}) => {       
    const [tab, setTab] = useState('jobs')    
    
    const [trendingJobs, setTrendingJobs] = useState()
    const [newestJobs, setNewestJobs] = useState()

    const [trendingHousings, setTrendingHousings] = useState()        
    const [newestHousings, setNewestHousings] = useState()    

    const [trendingList, setTrendingList] = useState()
    const [newestList, setNewestList] = useState()

    useEffect(() => {           
        var listingTabs = document.querySelectorAll(`.${styles.tab}`)        

        listingTabs.forEach(listTab => {
            listTab.getAttribute('name') === tab 
                ? listTab.classList.add(`${styles.current}`) 
                : listTab.classList.remove(`${styles.current}`)            
        });

        if (tab === "jobs") {
            setTrendingList(trendingJobs)
            setNewestList(newestJobs)
        } 
        else if (tab === "housings") {
            setTrendingList(trendingHousings)
            setNewestList(newestHousings)
        }        
    }, [tab])    

    useEffect(() => {                         
        setTrendingJobs(jobs.sort((a, b) => (b.views > a.views) ? 1 : -1))        
        setNewestJobs(jobs2.sort((a, b) => (b.createdAt > a.createdAt) ? 1 : -1))
        
        setTrendingHousings(housings?.sort((a, b) => (b.views > a.views) ? 1 : -1))        
        setNewestHousings(housings2?.sort((a, b) => (b.createdAt > a.createdAt) ? 1 : -1))                   
    }, [jobs, jobs2, housings, housings2])    

    useEffect(() => {
        if (tab === 'jobs') {
            setTrendingList(trendingJobs)
            setNewestList(newestJobs)
        } else if (tab === 'housings') {
            setTrendingList(trendingHousings)
            setNewestList(newestHousings)
        }
    }, [trendingJobs, newestJobs, trendingHousings, newestHousings])
    
    
    return (
        <section className={styles.trending_new}>            
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
                        { tab === 'jobs' && trendingList && trendingList.map((job, idx) => {
                            var date = new Date(job.createdAt).toDateString()
                            return (
                            <li key={idx}>
                                <Link href={`/jobs/${job._id}`}>
                                    <a className={styles.post_flex}>
                                        <div className={styles.flex_left}>
                                            <span className={styles.post_views}>{job.views}</span>
                                            <span className={styles.post_title}> {job.title}</span>
                                            <span className={styles.job_company}>– {job.company} </span>    
                                        </div>   
                                        <div className={styles.flex_right}>
                                            <Moment date={date} format="MM/DD/YY" className={styles.post_date} />    
                                        </div>                                             
                                    </a>
                                </Link>
                            </li>
                            ) 
                        })} 
                        
                        { tab === 'housings' && trendingList && trendingList.map((house, idx) => {
                            var date = new Date(house.createdAt).toDateString()
                            var area               
                            if (house.address) area = house.address[2]      
                            
                            return (
                            <li key={idx}>
                                <Link href={`/housings/${house._id}`}>
                                    <a className={styles.post_flex}>
                                        <div className={styles.flex_left}>
                                            <span className={styles.post_views}>{house.views}</span>
                                            <span className={styles.post_title}> {house.title}</span>
                                            <span className={styles.house_area}>[{area}]</span>
                                        </div>  
                                        <div className={styles.flex_right}>
                                            <Moment date={date} format="MM/DD/YY" className={styles.post_date} />
                                        </div>                                        
                                    </a>
                                </Link>
                            </li>
                            )
                        })}                                               
                    </ul>   
                </div> 

                <div className={styles.listing}>
                    <h3>New listing</h3>
                    <ul>
                        { tab === 'jobs' && newestList && newestList.map((job, idx) => {                                      
                            var date = new Date(job.createdAt).toDateString()                            
                            return (
                            <li key={idx}>
                                <Link href={`/jobs/${job._id}`}>
                                    <a className={styles.post_flex}>
                                        <div className={styles.flex_left}>
                                            <span className={styles.post_views}>{job.views}</span>
                                            <span className={styles.post_title}> {job.title}</span>
                                            <span className={styles.job_company}>– {job.company} </span>
                                        </div>                           
                                        <div className={styles.flex_right}>
                                            <Moment date={date} format="MM/DD/YY" className={styles.post_date} />
                                        </div>                                                     
                                    </a>
                                </Link>
                            </li>
                            )
                        })}        
                        { tab === 'housings' && newestList && newestList.map((house, idx) => {
                            var date = new Date(house.createdAt).toDateString()        
                            var area               
                            if (house.address) area = house.address[2]                        
                            
                            return (
                            <li key={idx}>
                                <Link href={`/housings/${house._id}`}>
                                    <a className={styles.post_flex}>
                                        <div className={styles.flex_left}>
                                            <span className={styles.post_views}>{house.views}</span>
                                            <span className={styles.post_title}> {house.title}</span>
                                            <span className={styles.house_area}>[{area}]</span>
                                        </div>           
                                        <div className={styles.flex_right}>
                                            <Moment date={date} format="MM/DD/YY" className={styles.post_date} />
                                        </div>                                                                     
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