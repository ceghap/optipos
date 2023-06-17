import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../../../prisma/client";


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {

        try {
            let items = [];

            if (Array.isArray(req.body.items)) {
                items = req.body.items;
            } else {
                items.push(req.body);
            }

            for (const item of items) {
                const { sku, quantity } = item;

                await prisma.product.update({
                    where: {
                        SKU: sku,
                    },
                    data: {
                        stockCount: quantity,
                    },
                });
            }

            res.status(200).json({ message: 'Inventory updated successfully' });
        } catch (error) {
            console.error('Error updating inventory:', error);
            res.status(500).json({ error: 'Internal server error' });
        }

    } else {

        return res.status(405).json({ message: 'Method not allowed' });
    }


}
