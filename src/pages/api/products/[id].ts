import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../../prisma/client";


export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    const productId = req.query.id as string;

    if (req.method === 'PUT') {
        const { title, image, price, stockCount, SKU } = req.body;

        try {
            const updatedProduct = await prisma.product.update({
                where: { id: productId },
                data: {
                    title,
                    image,
                    price,
                    stockCount,
                    SKU,
                },
            });

            res.status(200).json(updatedProduct);
        } catch (error) {
            res.status(500).json({ error: 'Failed to update the product.' });
        }
    } else if (req.method === 'DELETE') {
        try {
            await prisma.product.delete({
                where: { id: productId },
            });

            res.status(204).end();
        } catch (error) {
            res.status(500).json({ error: 'Failed to delete the product.' });
        }

    } else {
        res.status(404).json({ error: 'Invalid HTTP method.' });
    }
}

