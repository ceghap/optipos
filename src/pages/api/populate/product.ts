import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../../prisma/client";
import { fetchProducts, Product as FetchProduct } from "../../../actions/product";


const createProducts = async (products: FetchProduct[]) => {
    for (const product of products) {
        const existingCategories = await prisma.category.findMany({
            where: { name: product.category },
        });

        let category;
        if (existingCategories.length > 0) {
            category = existingCategories[0];
        } else {
            category = await prisma.category.create({
                data: { name: product.category },
            });
        }

        await prisma.product.create({
            data: {
                title: product.title,
                image: product.image,
                price: product.price,
                categories: {
                    connect: { id: category.id },
                },
            },
            include: { categories: true }, // Include the associated categories in the created product
        });
    }
};

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        const products: FetchProduct[] = await fetchProducts();
        await createProducts(products);

        res.status(200).json({ message: 'Products created successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}
