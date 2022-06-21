import { useEffect, useState } from 'react'
import Link from "next/link";
import styles from "../styles/Header.module.scss";
import { WorkOutline, HomeOutlined, Storefront, Forum, LiveHelp, FavoriteBorder, PersonOutlineOutlined } from '@mui/icons-material';


const Header = () => {
  return (
    <header className={styles.header}>
        <nav className={styles.site_nav}>
            <h1 className={styles.home_link}>
                <Link href="/">JdonL</Link>
            </h1>  

            <nav className={styles.page_nav}>
                <ul>
                    <li>
                        <Link href="/job">
                            <a><WorkOutline/> Job</a>
                        </Link>
                    </li>
                    <li>
                        <Link href="/housing">
                            <a><HomeOutlined/> Housing</a>
                        </Link>
                    </li>
                    <li>
                        <Link href="/for-sale">
                            <a><Storefront/> For Sale</a>
                        </Link>
                    </li>
                    <li>
                        <Link href="/community">
                            <a><Forum/> Community</a>
                        </Link>
                    </li>
                    <li>
                        <Link href="/qna">
                            <a><LiveHelp/> QnA</a>
                        </Link>
                    </li>
                    <li>
                        <Link href="/dating">
                            <a><FavoriteBorder/> Dating</a>
                        </Link>
                    </li>
                </ul>
            </nav>
            
            <Link href="/login">
                <a className={styles.login}><PersonOutlineOutlined/> Login</a>
            </Link>
        </nav>
    </header>
  )
}

export default Header