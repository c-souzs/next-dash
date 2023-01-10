import { NextApiHandler } from "next";
import { unstable_getServerSession } from "next-auth";
import prismadb from "../../../lib/prismadb";
import { authOptions } from "../auth/[...nextauth]";

const handlerPut: NextApiHandler = async (req, res) => {
    const { id } = req.query;
    const { name, amount, purchase, sale, categoryId  } = req.body;
    const session = await unstable_getServerSession(req, res, authOptions);

    if(!session){
        return res.status(401).json({
            message: "Você não tem permissão para acessar esses dados."
        });
    }

    try {
        const dataProductUpdate: {
            name?: string;
            amount?: number;
            purchasePrice?: number;
            saleValue?: number;
            categoryId?: number;
        } = {};

        if(name) dataProductUpdate.name = name;
        if(amount) dataProductUpdate.amount = amount;
        if(purchase) dataProductUpdate.purchasePrice = purchase;
        if(sale) dataProductUpdate.saleValue = sale;
        if(categoryId) dataProductUpdate.categoryId = categoryId;
        
        const product = await prismadb.product.update({
            where: {
                id: Number(id)
            },
            data: dataProductUpdate
        });

        return res.status(200).json({
            data: product
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
    const session = await unstable_getServerSession(req, res, authOptions);

    if(!session){
        return res.status(401).json({
            message: "Você não tem permissão para acessar esses dados."
        });
    }
    
    try {
        await prismadb.sale.deleteMany({
            where: {
                productId: idNumber
            }
        });
        const productDelete = await prismadb.product.delete({
            where: {
                id: idNumber
            }
        });

        return res.status(200).json({
            data: productDelete
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