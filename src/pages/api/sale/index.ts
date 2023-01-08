import { NextApiHandler } from "next";

import prismadb from "../../../lib/prismadb";
import { getAllSales } from "../../../lib/sale/getAll";

const handlerPost: NextApiHandler = async (req, res) => {
    const { amount, productId, userId, value } = req.body;
    
    try {
        const productSale = await prismadb.product.findUnique({
            where: {
                id: productId
            },
            select: {
                amount: true
            }
        });
        
        if(productSale && productSale.amount < amount){
            throw new Error("Quantidade de produtos acima do que contém no estoque.");
        }
        
        const sale = await prismadb.sale.createMany({
            data: {
                amount, productId, userId, value
            }
        });
        await prismadb.user.update({
            where: {
                id: userId
            },
            data: {
                amountSales: {
                    increment: 1
                }
            }
        });
        await prismadb.product.update({
            where: {
                id: productId
            },
            data: {
                amount: {
                    decrement: amount
                }
            }
        });

        return res.status(200).json({
            data: sale
        });
    } catch (e) {
        return res.status(401).json({
            message: e
        });
    }
}

const handlerGet: NextApiHandler = async (req, res) => {
    try {
        const sales = await getAllSales();

        return res.status(200).json({
            data: sales
        });
    } catch (e) {
        return res.status(401).json({
            message: e
        })
    }
}

const handlerDelete: NextApiHandler = async (req, res) => {
    const { ids, idsUser } = req.body as { ids: number[], idsUser: number[] };

    try {
        const sales = await prismadb.sale.deleteMany({
            where: {
                id: {
                    in: ids
                }
            }
        });
        await prismadb.user.updateMany({
            where: {
                id: {
                    in: idsUser
                }
            },
            data: {
                amountSales: {
                    decrement: 1
                }
            }
        });

        return res.status(200).json({
            data: sales
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