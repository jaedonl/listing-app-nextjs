import { useState, useEffect } from 'react'
import styles from "../styles/SearchBar.module.scss";
import { Search, Close } from '@mui/icons-material';
import { useRouter } from 'next/router';

const SearchBar = () => {
    const [keyword, setKeyword] = useState('')
    const [isSearchOn, setIsSearchOn] = useState(false)
    const [searchResult, setSearchResult] = useState()

    const router = useRouter()
    const page = router.pathname.slice(1)     
    
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

    const submitSearch = () => {

    }

    return (
        <div className={`${styles.search_box} ${page == 'jobs' && styles.page_jobs}`}>
            <form className={styles.search_wrapper}>
                <div className={styles.input_wrapper}>
                    <label htmlFor="search"><Search/></label>                
                    <input 
                        type="search" 
                        className={styles.search_input} 
                        name="search" placeholder="Search by title, location, name" 
                        aria-label="Search"                     
                        onChange={inputHandler} 
                    />
                </div>
                
                <select name="location" id="location" className={styles.location_select} defaultValue="NY">
                    <option value="AL">Alabama</option>
                    <option value="AK">Alaska</option>
                    <option value="AZ">Arizona</option>
                    <option value="AR">Arkansas</option>
                    <option value="CA">California</option>
                    <option value="CO">Colorado</option>
                    <option value="CT">Connecticut</option>
                    <option value="DE">Delaware</option>                    
                    <option value="FL">Florida</option>
                    <option value="GA">Georgia</option>
                    <option value="HI">Hawaii</option>
                    <option value="ID">Idaho</option>
                    <option value="IL">Illinois</option>
                    <option value="IN">Indiana</option>
                    <option value="IA">Iowa</option>
                    <option value="KS">Kansas</option>
                    <option value="KY">Kentucky</option>
                    <option value="LA">Louisiana</option>
                    <option value="ME">Maine</option>
                    <option value="MD">Maryland</option>
                    <option value="MA">Massachusetts</option>
                    <option value="MI">Michigan</option>
                    <option value="MN">Minnesota</option>
                    <option value="MS">Mississippi</option>
                    <option value="MO">Missouri</option>
                    <option value="MT">Montana</option>
                    <option value="NE">Nebraska</option>
                    <option value="NV">Nevada</option>
                    <option value="NH">New Hampshire</option>
                    <option value="NJ">New Jersey</option>
                    <option value="NM">New Mexico</option>
                    <option value="NY">New York</option>
                    <option value="NC">North Carolina</option>
                    <option value="ND">North Dakota</option>
                    <option value="OH">Ohio</option>
                    <option value="OK">Oklahoma</option>
                    <option value="OR">Oregon</option>
                    <option value="PA">Pennsylvania</option>
                    <option value="RI">Rhode Island</option>
                    <option value="SC">South Carolina</option>
                    <option value="SD">South Dakota</option>
                    <option value="TN">Tennessee</option>
                    <option value="TX">Texas</option>
                    <option value="UT">Utah</option>
                    <option value="VT">Vermont</option>
                    <option value="VA">Virginia</option>
                    <option value="WA">Washington</option>
                    <option value="WV">West Virginia</option>
                    <option value="WI">Wisconsin</option>
                    <option value="WY">Wyoming</option>
                </select>
                
                <button className={styles.search_submit} onClick={submitSearch} aria-label="search">Search</button>
            </form>          
        </div>
    )
}

export default SearchBar