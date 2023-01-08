import { NextApiHandler } from "next";

import prismadb from "../../../lib/prismadb";
import { getAllProducts } from "../../../lib/product/getAll";

const handlerPost: NextApiHandler = async (req, res) => {
    const { name, amount, purchase, sale, categoryId  } = req.body;
    
    try {
        
        const product = await prismadb.product.create({
            data: {
                name, amount, categoryId,
                purchasePrice: purchase,
                saleValue: sale
            }
        });

        return res.status(200).json({
            data: product
        });
    } catch (e) {
        return res.status(401).json({
            message: e
        });
    }
}

const handlerGet: NextApiHandler = async (req, res) => {
    try {
        const products = await getAllProducts();

        return res.status(200).json({
            data: products
        });
    } catch (e) {
        return res.status(401).json({
            message: e
        })
    }
}

const handlerDelete: NextApiHandler = async (req, res) => {
    const { ids } = req.body as { ids: number[] };
    
    try {
        await prismadb.sale.deleteMany({
            where: {
                productId: {
                    in: ids
                }
            }
        });
        const productsDelete = await prismadb.product.deleteMany({
            where: {
                id: {
                    in: ids
                }
            }
        });

        return res.status(200).json({
            data: productsDelete
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