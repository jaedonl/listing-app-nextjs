import { useState, useEffect } from 'react'
import styles from "../styles/TrendingNew.module.scss";

const TrendingNew = () => {
    const [tab, setTab] = useState('job')
    const [trendingList, setTrendingList] = useState()
    const [newList, setNewList] = useState()
    
    useEffect(() => {   
        // var currentTab = document.querySelectorAll(`li[name="${tab}"]`)
        // currentTab.classList.add(styles.current)
        var listingTabs = document.querySelectorAll('.tab')
        listingTabs.forEach(listingTab => {
            if (tab === listingTab.getAttribute('name')) {
                listingTab.classList.add(`.${styles.current}`)
            } else {
                listingTab.classList.remove(`.${styles.current}`)
            }
        });


    }, [tab])

    return (
        <section className={styles.trending_new}>
            <h2>Trending / New</h2>

            <menu className={styles.listing_tab}>
                <li name="job" className={`${styles.tab} ${styles.current}`}>
                    <button type="button" name="job" onClick={(e) => {setTab(e.currentTarget.getAttribute('name'))}}>
                        Job
                    </button>
                </li>
                <li name="housing" className={styles.tab}>
                    <button type="button" name="housing" onClick={(e) => {setTab(e.currentTarget.getAttribute('name'))}}>
                        Housing
                    </button>
                </li>
                <li name="forsale" className={styles.tab}>
                    <button type="button" name="forsale" onClick={(e) => {setTab(e.currentTarget.getAttribute('name'))}}>
                        For sale
                    </button>
                </li>
                <li name="community" className={styles.tab}>
                    <button type="button" name="community" onClick={(e) => {setTab(e.currentTarget.getAttribute('name'))}}>
                        Community
                    </button>
                </li>
                <li name="qna" className={styles.tab}>
                    <button type="button" name="qna" onClick={(e) => {setTab(e.currentTarget.getAttribute('name'))}}>
                        QnA
                    </button>
                </li>                
            </menu>

            <div className={styles.listing_grid}>
                <div className={styles.listing}>
                    <h3>Hot listing</h3>
                    <ul>
                        <li>Hot 1</li>
                        <li>Hot 2</li>
                        <li>Hot 3</li>
                        <li>Hot 4</li>
                        <li>Hot 5</li>                        
                    </ul>   
                </div> 

                <div  className={styles.listing}>
                    <h3>New listing</h3>
                    <ul>
                        <li>New 1</li>
                        <li>New 2</li>
                        <li>New 3</li>
                        <li>New 4</li>
                        <li>New 5</li>
                    </ul>   
                </div>                 
            </div>  
        </section>
    )
}

export default TrendingNew