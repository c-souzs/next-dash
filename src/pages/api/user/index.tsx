import { NextApiHandler } from "next";
import { unstable_getServerSession } from "next-auth";

import prismadb from "../../../lib/prismadb";
import { getAllUsers } from "../../../lib/user/getAll";
import { encodePassword } from "../../../utils/bcrypt";
import { authOptions } from "../auth/[...nextauth]";

const handlerPost: NextApiHandler = async (req, res) => {
    const { name, image, sex, address, officeId, email  } = req.body;
    const password = encodePassword(email);

    const session = await unstable_getServerSession(req, res, authOptions);

    if(!session){
        return res.status(401).json({
            message: "Você não tem permissão para acessar esses dados."
        });
    }
    
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
    const session = await unstable_getServerSession(req, res, authOptions);

    if(!session){
        return res.status(401).json({
            message: "Você não tem permissão para acessar esses dados."
        });
    }

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
    const { ids } = req.body as { ids: number[] };

    const session = await unstable_getServerSession(req, res, authOptions);

    if(!session){
        return res.status(401).json({
            message: "Você não tem permissão para acessar esses dados."
        });
    }

    try {
        await prismadb.sale.deleteMany({
            where: {
                userId: {
                    in: ids
                }
            }
        });
        await prismadb.login.deleteMany({
            where: {
                userId: {
                    in: ids
                }
            }
        });
        const users = await prismadb.user.deleteMany({
            where: {
                id: {
                    in: ids
                }
            }
        });

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