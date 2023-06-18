import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../../prisma/client";
import { Product } from "@prisma/client";


export default async function handler(req: NextApiRequest, res: NextApiResponse) {

  if (req.method === 'POST') {
    const { title, image, price, stockCount, SKU, categoryId } = req.body;

    try {
      const createdProduct = await prisma.product.create({
        data: {
          title,
          image,
          price,
          stockCount,
          SKU,
          categories: {
            connect: { id: categoryId },
          },
        },
      });

      res.status(201).json(createdProduct);
    } catch (error) {
      res.status(500).json({ error: 'Failed to create the product.' });
    }
  }
  else if (req.method === 'GET') {

    try {
      const { title } = req.query;

      // Fetch products and include their associated categories
      const products: Product[] = await prisma.product.findMany({
        where: {
          title: {
            contains: title ? title.toString().trim() : undefined,
            mode: 'insensitive',
          },
        },
        include: {
          categories: true,
        },
        orderBy: {
          title: 'asc' // Sort by title in ascending order. Use 'desc' for descending order.
        }
      });

      res.status(200).json(products);
    } catch (error) {
      console.error('Error retrieving products:', error);
      res.status(500).json({ error: 'Internal server error.' });
    }
  }
  else {
    res.status(404).json({ error: 'Invalid HTTP method.' });
  }
}
