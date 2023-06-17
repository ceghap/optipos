import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../../prisma/client";


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    const { selectedItems } = req.body;

    const totalPrice = selectedItems?.reduce((accumulator: number, currentItem: any) => {
        return accumulator + currentItem.price;
    }, 0);

    try {
        const sale = await prisma.sale.create({
            data: {
                total: totalPrice,
                items: {
                    create: selectedItems.map((item: any) => ({
                        quantity: item.quantity,
                        productId: item.id
                    }))
                }
            },
            include: {
                items: true
            }
        });

        // Deduct product stock count
        await Promise.all(
            selectedItems.map((item: any) =>
                prisma.product.update({
                    where: { id: item.id },
                    data: { stockCount: { decrement: item.quantity } }
                })
            )
        );

        res.status(201).json({ sale });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}
