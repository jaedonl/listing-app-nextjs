import dbConnect from "../../../util/mongo";
import User from '../../../models/User';

const handler = async (req, res) => {
    const { method, query: id } = req; 
    
    await dbConnect()

    if (method === "POST") {                    
        try {
            const user = await User.findOne({ email: req.body.email })
            if (!user) res.status(401).send('Wrong email.')
            if (user.password !== req.body.password) res.status(401).send('Wrong password.')

            res.status(200).json(user)

        } catch (error) {
            res.status(500).json(error)
        }
    }
}

export default handler;