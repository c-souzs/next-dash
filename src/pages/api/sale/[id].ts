import { NextApiHandler } from "next";
import { unstable_getServerSession } from "next-auth";
import prismadb from "../../../lib/prismadb";
import { authOptions } from "../auth/[...nextauth]";

const handlerPut: NextApiHandler = async (req, res) => {
    const { id } = req.query;
    const { amount, productId, userId, value } = req.body;

    const session = await unstable_getServerSession(req, res, authOptions);

    if(!session){
        return res.status(401).json({
            message: "Você não tem permissão para acessar esses dados."
        });
    }

    const dataSaleUpdate: {
        amount?: number;
        productId?: number;
        userId?: number;
        value?: number;
    } = {};

    if(amount) dataSaleUpdate.amount = amount;
    if(productId) dataSaleUpdate.productId = productId;
    if(userId) dataSaleUpdate.userId = userId;
    if(value) dataSaleUpdate.value = value;

    try {
        const saleUpdate = await prismadb.sale.update({
            where: {
                id: Number(id)
            },
            data: dataSaleUpdate
        });
        return res.status(200).json({
            data: saleUpdate
        });
    } catch (e) {
        return res.status(401).json({
            message: e
        })
    }
}

const handlerDelete: NextApiHandler = async (req, res) => {
    const { id } = req.query;
    const session = await unstable_getServerSession(req, res, authOptions);

    if(!session){
        return res.status(401).json({
            message: "Você não tem permissão para acessar esses dados."
        });
    }
    
    try {
        const saleDelete = await prismadb.sale.delete({
            where: {
                id: Number(id)
            }
        });
        const { userId } = saleDelete;
        await prismadb.user.update({
            where: {
                id: userId
            },
            data: {
                amountSales: {
                    decrement: 1
                }
            }
        });

        return res.status(200).json({
            data: saleDelete
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