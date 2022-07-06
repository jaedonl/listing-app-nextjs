import dbConnect from "../../../util/mongo";
import User from '../../../models/User';

const handler = async (req, res) => {
    const { method, query: id } = req; 
    
    await dbConnect()

    if (method === "POST") {                    
        try {
            const user = await User.findOne({ email: req.body.email })
            if (req.body.email === '') res.status(401).send("Please input email.")
            if (req.body.password === '') res.status(401).send("Please input password.")

            if (!user) res.status(401).send('Wrong email.', {email: req.body.email})
            if (user.password !== req.body.password) res.status(401).send('Wrong password.', {password: req.body.password})

            res.status(200).json(user)

        } catch (error) {
            res.status(500).json(error)
        }
    }
}

export default handler;