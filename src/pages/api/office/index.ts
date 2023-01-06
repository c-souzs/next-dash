import { NextApiHandler } from "next";

import prismadb from "../../../lib/prismadb";

const handleGet: NextApiHandler = async (req, res) => {
    try {
        const positions = await prismadb.office.findMany();

        return res.status(200).json({
            data: { positions }
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
            handleGet(req, res);
            break;
        default:
            return res.status(404).json({message: 'Route not found.'})
    }
}

export default handler