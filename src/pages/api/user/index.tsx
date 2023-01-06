import { NextApiHandler } from "next";

import prismadb from "../../../lib/prismadb";
import { getAllUsers } from "../../../lib/user/getAll";
import { encodePassword } from "../../../utils/bcrypt";

const handlerPost: NextApiHandler = async (req, res) => {
    const { name, image, sex, address, officeId, email  } = req.body;
    const password = encodePassword(email);
    
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
            data: user
        });
    } catch (e) {
        return res.status(401).json({
            message: e
        });
    }
}

const handlerGet: NextApiHandler = async (req, res) => {
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

const handlerDelete: NextApiHandler = async (req, res) => {
    try {
        await prismadb.login.deleteMany();
        const users = await prismadb.user.deleteMany();

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
            handlerGet(req, res);
            break;
        case 'DELETE':
            handlerDelete(req, res);
            break;
        default:
            return res.status(404).json({message: 'Route not found.'})
    }
}

export default handler