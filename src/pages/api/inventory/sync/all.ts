// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from "../../../../../prisma/client";
import { fetchItems } from 'src/actions/inventory';



export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {

    const items = await fetchItems();


    try {
        for (const item of items) {
            const { sku, image, quantity } = item;
            const product = await prisma.product.findUnique({
                where: { SKU: sku },
            });

            if (product) {
                await prisma.product.update({
                    where: { id: product.id },
                    data: { SKU: sku, image, stockCount: quantity },
                });

                console.log(`SKU, image, and stockCount updated for product: ${product.title}`);
            }
        }

        res.status(200).json({ message: 'SKU, image, and stockCount update successful' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }


}
