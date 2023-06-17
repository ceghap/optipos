import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../../prisma/client";
import { Product } from "@prisma/client";


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const { title, page = 1, size = 10 } = req.query;
        const parsedPage = parseInt(page as string, 10);
        const parsedSize = parseInt(size as string, 10);

        // Calculate skip value based on the requested page and pageSize
        const skip = (parsedPage - 1) * parsedSize;

        // Fetch products and include their associated categories
        const products: Product[] = await prisma.product.findMany({
            where: {
                title: {
                    contains: title ? title.toString() : undefined,
                },
            },
            include: {
                categories: true,
            },
            orderBy: {
                title: 'asc' // Sort by title in ascending order. Use 'desc' for descending order.
            },
            skip, // Skip the specified number of items
            take: parsedSize, // Take only the specified number of items
        });

        res.status(200).json(products);
    } catch (error) {
        console.error('Error retrieving products:', error);
        res.status(500).json({ error: 'Internal server error.' });
    }
}
