import dbConnect from "../../../util/mongo";
import Job from '../../../models/Job';

const handler = async (req, res) => {
    const { method } = req; 
    
    await dbConnect()

    if (method === "GET") {        
        let key = Object.keys(req.query)[0]

        if (req.query) {
            try {
                let jobs
                if (key === '_limit') jobs = await Job.find().limit(8)                
                else jobs = await Job.find(req.query)

                res.status(200).json(jobs)        

            } catch (error) {
                res.status(500).json(error)
            }
        }        
        else {
            try {
                const jobs = await Job.find()
                res.status(200).json(jobs)   
            } catch (error) {
                res.status(500).json(error)
            }   
        }             
    } 

    if (method === "POST") {
        try {
            const job = await Job.create(req.body)
            res.status(201).json(job)
        } catch (error) {
            res.status(500).json(error)
        }
    }
}

export default handler;