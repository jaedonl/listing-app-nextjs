import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import styles from '../styles/Home.module.scss'
import SectionGrid from '../components/Partners'
import TrendingNew from '../components/TrendingNew'
import SearchBar from '../components/SearchBar'
import axios from 'axios'
import { useSession, signIn, signOut } from "next-auth/react"


export default function Home({jobs, jobs2, housings, housings2}) {
    const { data: session, status } = useSession()

    console.log(session, status);

    return (
        <div className={styles.container}>
            <Head>
                <title>JdonL | Home</title>
                <meta name="description" content="All listings you are looking for." />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            {/* { status !== 'loading' && !session && (
                <>
                    Not signed in <br />
                    <button onClick={() => signIn()}>Sign in</button>
                </>
            )} */}
            
            {/* { session && ( */}
            <main>
                <div className={styles.flex}>
                    <div className={styles.main_sections}>
                        <SectionGrid />        
                        <SearchBar />    
                        <TrendingNew jobs={jobs} jobs2={jobs2} housings={housings} housings2={housings2} />  
                    </div>                    

                    <aside className={styles.aside_banner}>
                        <div className={styles.side_ads_banner}>
                            <Link href="#">
                                <a>
                                    <Image src="/assets/images/banner/sidebanner_1.jpeg" width="100%" height="100%" layout="responsive" objectFit="cover" className={styles.image} />
                                    
                                </a>
                            </Link>     
                        </div>
                        <div className={styles.side_ads_banner}>
                            <Link href="#">
                                <a>
                                    <Image src="/assets/images/banner/sidebanner_2.jpeg" width="100%" height="100%" layout="responsive" objectFit="cover" className={styles.image} />
                                </a>
                            </Link>     
                        </div>
                    </aside>   
                </div>
            </main>    
            {/* )} */}
                    
                
        </div>
    )
}

export const getServerSideProps = async (context) => {         
    const jobs_res          = await axios.get('http://localhost:3000/api/jobs')
    const housings_res      = await axios.get('http://localhost:3000/api/housings')     
    // const forsales_res      = await axios.get('/api/forsales')     
    // const communities_res   = await axios.get('/api/communities')     
    // const qnas_res          = await axios.get('/api/qnas')     
    
    return {
        props: {
            jobs: jobs_res.data,      
            jobs2: jobs_res.data, 
            housings: housings_res.data,       
            housings2: housings_res.data,
        },
    }
}

