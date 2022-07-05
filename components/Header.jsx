import { useEffect, useState } from 'react'
import Link from "next/link";
import styles from "../styles/Header.module.scss";
import { WorkOutline, HomeOutlined, Storefront, ForumOutlined, LiveHelpOutlined, FavoriteBorder, PersonOutlineOutlined, NotificationsOutlined, Search } from '@mui/icons-material';
import { useSession, signIn, signOut } from "next-auth/react"

const Header = () => {
    const { data: session, status } = useSession()
    
    return (
        <header className={styles.header}>
            <nav className={styles.site_nav}>
                <h1 className={styles.home_link}>
                    <Link href="/">JdonL</Link>
                </h1>  

                <nav className={styles.page_nav}>
                    <ul>
                        <li>
                            <Link href="/jobs">
                                <a className={styles.link_icon}><WorkOutline/> Job</a>
                            </Link>
                        </li>
                        <li>
                            <Link href="/housings">
                                <a className={styles.link_icon}><HomeOutlined/> Housing</a>
                            </Link>
                        </li>
                        <li>
                            <Link href="/forsales">
                                <a className={styles.link_icon}><Storefront/> For Sale</a>
                            </Link>
                        </li>
                        <li>
                            <Link href="/communities">
                                <a className={styles.link_icon}><ForumOutlined/> Community</a>
                            </Link>
                        </li>
                        <li>
                            <Link href="/qnas">
                                <a className={styles.link_icon}><LiveHelpOutlined/> QnA</a>
                            </Link>
                        </li>      
                    </ul>
                </nav>

                <nav className={styles.right_nav}>
                    <ul>
                        <li>
                            <Link href="/qnas">
                                <a><NotificationsOutlined/> Notification</a>                            
                            </Link>
                        </li>
                        <li>
                            <Link href="/account">
                                <a className={styles.login}><PersonOutlineOutlined/> 
                                    { !session ? 'Login' : <span>{session.user.name.split(' ')[0]}</span>}
                                </a>
                            </Link>
                        </li>
                    </ul>                
                </nav>
                            
            </nav>
        </header>
    )
}

export default Header