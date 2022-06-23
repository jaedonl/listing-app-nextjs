import dbConnect from '../../../util/mongo';
import Job from '../../../models/Job';

export default async function handler(req, res) {
    const { method, query: { id } } = req;    

    dbConnect();

    if (method === "GET") {
        try {
            const job = await Job.findById(id);
            res.status(200).json(job)
        } catch (error) {
            res.status(500).json(error)
        }
    }

    // if (method === "PUT") {
    //     try {
    //         const job = await Job.findByIdAndUpdate(id, req.body, {
    //             new: true,
    //         });
    //         res.status(200).json(job)
    //     } catch (error) {
    //         res.status(500).json(error)
    //     }
    // }

    // if (method === "DELETE") {
    //     try {
    //         await Job.findByIdAndDelete(id)
    //         res.status(200).json(`The job ${id} has been deleted.`)
    //     } catch (error) {
    //         res.status(500).json(error)
    //     }
    // }    
}