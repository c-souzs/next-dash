import { NextApiHandler } from "next";
import prismadb from "../../../lib/prismadb";
import { getAllUsers } from "../../../lib/user/getAll";
import { encodePassword } from "../../../utils/bcrypt";

const handlerPost: NextApiHandler = async (req, res) => {
    const { name, image, sex, address, officeId, email  } = req.body;

    const password = encodePassword(email);
    console.log({ name, image, sex, address, officeId, email, password });
    
    try {
        
        const user = await prismadb.user.create({
            data: {
                name, address, image, sex, officeId,
                login: {
                    create: {
                        email, password
                    }
                }
            }
        });

        return res.status(200).json({
            user
        });
    } catch (e) {
        console.log(e);
        return res.status(401).json({
            message: e
        });
    }
}

const handleGet: NextApiHandler = async (req, res) => {
    try {
        const users = await getAllUsers();

        return res.status(200).json({
            data: users
        });
    } catch (e) {
        return res.status(401).json({
            message: e
        })
    }
}

const handler: NextApiHandler = async (req, res) => {
    const { method } = req;
    
    switch (method) {
        case 'POST':
            handlerPost(req, res);
            break;
        case 'GET':
            handleGet(req, res);
            break;
        default:
            return res.status(404).json({message: 'Route not found.'})
    }
}

export default handler