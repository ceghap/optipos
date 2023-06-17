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
      const { name, sku } = item;
      const product = await prisma.product.findFirst({
        where: { title: name },
      });

      if (product) {
        await prisma.product.update({
          where: { id: product.id },
          data: { SKU: sku },
        });

        console.log(`SKU updated for product: ${product.title}`);
      }
    }

    res.status(200).json({ message: 'SKU update successful' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }


}
