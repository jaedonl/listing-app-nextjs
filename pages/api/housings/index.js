import dbConnect from "../../../util/mongo";
import Housing from '../../../models/Housing';

const handler = async (req, res) => {
    const { method, query: {id} } = req;

    await dbConnect()

    if (method === "GET") {
        try {
            const housings = await Housing.find()
            res.status(200).json(housings)   
        } catch (error) {
            res.status(500).json(error)
        }        
    }

    if (method === "POST") {
        try {
            const housing = await Housing.create(req.body)
            res.status(201).json(housing)
        } catch (error) {
            res.status(500).json(error)
        }
    }
}

export default handler;