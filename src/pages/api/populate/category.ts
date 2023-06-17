import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../../prisma/client";
import { fetchFakeProducts, Product as FetchProduct } from "../../../actions/product";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const products: FetchProduct[] = await fetchFakeProducts(); // Fetch products from the external API

    // Loop through the products and create or update categories in the database
    for (const product of products) {
      const { category } = product;

      await prisma.category.upsert({
        where: { name: category },
        update: {},
        create: { name: category },
      });
    }

    res.status(200).json({ message: 'Categories populated successfully' });
  } catch (error) {
    console.error('Error populating categories:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}
