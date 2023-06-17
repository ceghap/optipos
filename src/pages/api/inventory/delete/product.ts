import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../../../prisma/client";


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {

        try {
            let productIds = [];

            if (Array.isArray(req.body.ids)) {
                productIds = req.body.ids;
            } else {
                productIds.push(req.body.id);
            }

            await prisma.product.deleteMany({
                where: {
                    id: {
                        in: productIds,
                    },
                },
            });

            res.status(200).json({ message: 'Products deleted successfully' });
        } catch (error) {
            console.error('Error deleting products:', error);
            res.status(500).json({ error: 'Internal server error' });
        }

    } else {

        return res.status(405).json({ message: 'Method not allowed' });
    }


}
