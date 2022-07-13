import React, {useState, useEffect} from 'react'
import Image from 'next/image';
import styles from "../styles/JobInfo.module.scss";
import { useRouter } from 'next/router';
import Link from 'next/link';
import Moment from 'react-moment';

const JobInfo = ({jobData}) => {      
    const router = useRouter()
    const page = router.query.id    

    useEffect(() => {
        console.log(jobData.desc);
    }, [jobData])
    
    const TextEditor = (props) => {            
        if (props.block_type === 'header-one') return <h1>{props.block.text}</h1>        
        else if (props.block_type === 'header-two') return <h2>{props.block.text}</h2>
        else if (props.block_type === 'header-three') return <h3>{props.block.text}</h3>

        else if (props.block_type === 'unordered-list-item') return <p className={styles.text_editor_list}><span>&#8226;</span> {props.block.text}</p>
        else if (props.block_type === 'ordered-list-item') return <p>&#8226; {props.block.text}</p>     

        else if (props.block.text === '') return <br/>

        else return <p>{props.block.text}</p>             
    }    

    return (
        <div className={`${styles.job_info} ${page && styles.page_job}`}>  
            <div className={styles.job_heading}>
                <div className={styles.title_div}>                    
                    <Link href={`/jobs/${jobData._id}`}><a><h1>{jobData.title}</h1></a></Link>                               
                </div>                
                <div className={styles.title_flex}>
                    <div className={styles.job_header}>
                        <div className={styles.image_wrapper}>       
                            { !jobData.img 
                                ? <Image src="/assets/images/jobs/default-image.png" layout="fill" objectFit="cover" className={styles.image} />
                                : <Image src={jobData.img} layout="fill" objectFit="cover" className={styles.image} />
                            }                                                           
                        </div>     
                        <div className={styles.job_info1}>
                            <h2 className={styles.company_title}>{jobData.company}</h2>
                            <a href={jobData.website} className={styles.website_link}>Website link</a>
                            <span className={styles.location_commute}>{jobData.location} ({jobData.commute_type})</span>
                            <span className={styles.pay}>${jobData.pay}</span>  
                        </div>
                    </div>
                           
                    <div className={styles.job_info2}>                        
                        <span className={styles.email}><span className={styles.infon_label}> email:</span> {jobData.email}</span>
                        <span className={styles.phone}><span className={styles.infon_label}> phone:</span> {jobData.phone}</span>
                        <span className={styles.job_type}><span className={styles.infon_label}> work type:</span> {jobData.job_type}</span>
                        <span className={styles.views}><span className={styles.infon_label}> post date:</span> <Moment date={jobData.createdAt} format="MM/DD/YYYY" className={styles.post_date} /></span>
                        <span className={styles.views}><span className={styles.infon_label}> post views:</span> {jobData.views}</span>
                    </div>                        
                </div>    

                <div className={styles.job_tags}>
                    <span>Tags</span>                
                    <ul>{jobData.tags.map((tag, idx) => <li key={idx}>{tag}</li>)}</ul>
                </div>

                <div className={styles.job_desc}>                                        
                    {jobData.desc.map((block, idx) => {
                        if (block.type === 'unordered-list-item') return <TextEditor block_type={block.type} block={block} />                        
                        else if (block.type === 'ordered-list-item') return (<ol><TextEditor block_type={block.type} block={block} /></ol>)
                        else return <TextEditor block_type={block.type} block={block} />
                    })}                    
                </div>                
            </div>                                
        </div> 
    )
}

export default JobInfo