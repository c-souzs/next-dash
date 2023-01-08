import { NextApiHandler } from "next";
import { getCardsSales } from "../../../lib/sale/getCards";

const handlerGet: NextApiHandler = async (req, res) => {
    try {
        const sales = await getCardsSales();

        return res.status(200).json({
            data: {...sales}
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
        case 'GET': 
            handlerGet(req, res);
            break;
        default:
            return res.status(404).json({message: 'Route not found.'})
    }
}

export default handler