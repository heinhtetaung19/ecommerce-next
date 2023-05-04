import User from "@/models/User";
import db from "@/utils/db";
import bcryptjs from "bcryptjs";

const handler = async (req, res) => {
    if (req.method === "POST") {
        const { name, email, password } = req.body;

        if (
            !name ||
            !email ||
            !email.includes("@") ||
            !password ||
            password.trim().length < 5
        ) {
            res.status(422).json({ msg: "validation error" });
            return;
        }

        await db.connect();

        const existedUser = await User.findOne({ email: email });
        if (existedUser) {
            res.status(422).json({ msg: "This user is already existed" });
            await db.disconnect();
            return;
        }

        const newUser = new User({
            name,
            email,
            password: bcryptjs.hashSync(password),
            isAdmin: false,
        });

        const user = await newUser.save();
        await db.disconnect();

        res.status(201).send({
            msg: "Created user",
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
        });
    } else {
        res.status(405).json({ msg: "Request method not allowed" });
    }
};

export default handler;
