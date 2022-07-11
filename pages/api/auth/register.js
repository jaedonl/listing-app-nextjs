import dbConnect from "../../../util/mongo";
import User from '../../../models/User';

const handler = async (req, res) => {    
    const { method, query: id } = req; 
    
    await dbConnect()

    if (method === "POST") {
        try {
            const user = await User.create(req.body) 
            res.status(201).json(user)
        } catch (error) {
            res.status(500).json(error)
        }
    }
}

export default handler;