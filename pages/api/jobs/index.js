import dbConnect from "../../../util/mongo";
import Job from '../../../models/Job';

const handler = async (req, res) => {
    const { method, query: id } = req; 
    
    await dbConnect()

    if (method === "GET") {
        try {
            const jobs = await Job.find()
            res.status(200).json(jobs)   
        } catch (error) {
            res.status(500).json(error)
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