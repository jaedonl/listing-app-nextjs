import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import styles from '../styles/Home.module.scss'
import Partners from '../components/Partners'
import TrendingNew from '../components/TrendingNew'
import SearchBar from '../components/SearchBar'
import axios from 'axios'
import { useSession, signIn, signOut } from "next-auth/react"
import { useRouter } from 'next/router'


export default function Home({jobs, jobs2, housings, housings2}) {
    const { data: session, status } = useSession()
    const router = useRouter()
    // console.log(session, status);

    // const handleSignOut = async () => {
    //     const data = await signOut({ redirect: false, callbackUrl: '/account'})
    //     router.push(data.url)
    // }

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
                    <button onClick={signIn}>Sign in</button>
                </>
            )}
            {session && ( 
                <>
                    You are signed in as {session.user.email} <br />
                    <button onClick={handleSignOut}>Sign out</button>
                </>
            )} */}

            {/* { session && ( */}
            <main className={styles.main_sections}>
                <section>
                    <SearchBar />    
                    <TrendingNew jobs={jobs} jobs2={jobs2} housings={housings} housings2={housings2} />  
                </section>                

                <section>
                <div className={styles.partners_and_ads}>
                    <Partners />        
                    <aside className={styles.aside_banner}>
                        <div className={styles.side_ads_banner}>
                            <Link href="#">
                                <a>
                                    <div className={styles.image_wrapper}>
                                        <Image src="/assets/images/banner/sidebanner_1.jpeg" layout="fill" objectFit="contain" className={styles.image} />
                                    </div>                                        
                                </a>
                            </Link>     
                        </div>
                    </aside>
                </div>   
                </section>
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

