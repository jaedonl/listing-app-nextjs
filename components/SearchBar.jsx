import { useState, useEffect } from 'react'
import styles from "../styles/SearchBar.module.scss";
import { Search, Close } from '@mui/icons-material';

const SearchBar = () => {
    const [keyword, setKeyword] = useState('')
    const [isSearchOn, setIsSearchOn] = useState(false)
    const [searchResult, setSearchResult] = useState()
    
    // useEffect(() => {                            
    //     const fetchAllProducts = async () => {            
    //         const res = await axios.get()
    //         setSearchResult(products)            
    //     }        
    //     fetchAllProducts()    
    // }, [isSearchOn])

    useEffect(() => {
        keyword === '' ? setIsSearchOn(false) : setIsSearchOn(true)        
    }, [keyword])

    const inputHandler = (e) => {
        setKeyword(e.target.value)    
    }

    return (
        <div className={styles.search_box}>
            <div className={styles.search_wrapper}>
                <Search/>
                <input 
                    type="search" 
                    className={styles.search_input} 
                    name="search" placeholder="Search list" 
                    aria-label="Search list"                     
                    onChange={inputHandler} 
                />
                <Close className={styles.search_close} onClick={() => setIsSearchOn(false)} />
            </div>          
        </div>
    )
}

export default SearchBar