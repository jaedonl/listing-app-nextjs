import React, {useState, useEffect} from 'react'
import axios from 'axios'

const Job = ({jobData}) => {
    const [job, setJob] = useState(jobData)    

    return (
        <main>
            <h1>{job.title}</h1>
            <h2>{job.company}</h2>
        </main>
    )
}


export const getServerSideProps = async ({params}) => {               
    const param = params.id    
    const job_res = await axios.get(`http://localhost:3000/api/jobs/${param}`)      
    
    return {
        props: {
            jobData: job_res.data
        },
    }
}

export default Job