import { NextApiHandler } from "next";
import { encodePassword } from "../../../utils/bcrypt";
import prismadb from "../../../lib/prismadb";

const handlerPut: NextApiHandler = async (req, res) => {
    const { id } = req.query;
    const { name, image, sex, address, officeId, email  } = req.body;

    try {
        const dataUpdateUser: {
            name?: string;
            image?: string;
            sex?: boolean;
            address?: string;
            officeId?: number;
        } = {};
        
        const dataUpdateLogin: {
            email?: string;
            password?: string;
        } = {};

        if(name) dataUpdateUser.name = name;
        if(image) dataUpdateUser.image = image;
        if(!sex) dataUpdateUser.sex = sex;
        if(address) dataUpdateUser.address = address;
        if(officeId) dataUpdateUser.officeId = officeId;    
        if(email) {
            dataUpdateLogin.email = email;
            const newPassword = encodePassword(email);
            dataUpdateLogin.password = newPassword;

        };    
        
        const userUpdate = await prismadb.user.update({
            where: {
                id: Number(id)
            },
            data: dataUpdateUser
        });

        await prismadb.login.update({
            where: {
                id: Number(id)
            },
            data: dataUpdateLogin
        });

        return res.status(200).json({
            data: userUpdate
        });
    } catch (e) {
        return res.status(401).json({
            message: e
        })
    }
}

const handlerDelete: NextApiHandler = async (req, res) => {
    const { id } = req.query;
    const idNumber = Number(id);
    
    try {
        await prismadb.sale.deleteMany({
            where: {
                userId: idNumber
            }
        })
        await prismadb.login.delete({
            where: {
                id: idNumber
            }
        })
        const user = await prismadb.user.delete({
            where: {
                id: idNumber
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

const handler: NextApiHandler = async (req, res) => {
    const { method } = req;
    
    switch (method) {
        case 'PUT': 
            handlerPut(req, res);
            break;
        case 'DELETE':
            handlerDelete(req, res);
            break;
        default:
            return res.status(404).json({message: 'Route not found.'})
    }
}

export default handler