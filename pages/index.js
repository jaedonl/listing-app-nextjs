import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import styles from '../styles/Home.module.scss'
import SectionGrid from '../components/Partners'
import TrendingNew from '../components/TrendingNew'
import SearchBar from '../components/SearchBar'

export default function Home() {
    return (
        <div className={styles.container}>
            <Head>
                <title>JdonL | Home</title>
                <meta name="description" content="All listings you are looking for." />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            
            <main>
                <div className={styles.flex}>
                    <div className={styles.main_sections}>
                        <SectionGrid />        
                        <SearchBar />    
                        <TrendingNew />  
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
                
        </div>
    )
}
