import dbConnect from "../../../util/mongo";
import User from '../../../models/User';

const handler = async (req, res) => {
    const { method, query: { id } } = req;    
        
    dbConnect();

    if (method === "GET") {
        try {
            const user = await User.findById(id);
            res.status(200).json(user)
        } catch (error) {
            res.status(500).json(error)
        }
    }
}

export default handler;