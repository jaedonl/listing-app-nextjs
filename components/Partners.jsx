import React from 'react'
import styles from "../styles/Partners.module.scss";
import Image from 'next/image';
import Link from 'next/link';
import { partnersData } from '../data/partners';

const Partners = () => {
    return (
        <section className={styles.home_partner}>
            <h2>Our Partners</h2>            
            <div className={styles.section_grid}>                            
                <div className={styles.section_left}>
                    {partnersData.map((partner, idx) => (
                        <div key={idx} className={styles.grid_item}>       
                            <Link href={`/partners/${partner.handle}`}>
                                <a>
                                    <Image src={partner.imgUrl} width="100%" height="100%" layout="responsive" objectFit="contain" className={styles.image} />
                                </a>
                            </Link>                                     
                        </div>
                    ))}
                </div>                
            </div>
        </section>
    )
}

export default Partners