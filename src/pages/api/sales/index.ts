import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../../prisma/client";
import { Product } from "@prisma/client";

interface ProductWithQuantity extends Product {
    quantity: number;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    const { selectedItems }: { selectedItems: Product[] } = req.body;

    const totalPrice = selectedItems?.reduce((accumulator: number, currentItem: any) => {
        return accumulator + currentItem.price;
    }, 0);

    const reducedSelectedItems: ProductWithQuantity[] = selectedItems.reduce((acc: any[], item) => {
        const existingItem = acc.find((i) => i.id === item.id);

        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            acc.push({ ...item, quantity: 1 });
        }

        return acc;
    }, []);

    try {
        const sale = await prisma.sale.create({
            data: {
                total: totalPrice,
                items: {
                    create: reducedSelectedItems.map((item: ProductWithQuantity) => ({
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
            reducedSelectedItems.map((item: ProductWithQuantity) =>
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
