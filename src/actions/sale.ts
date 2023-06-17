import { Product } from "@prisma/client";

export const addSale = async (selectedItems: Product[]) => {

    const res = await fetch(`/api/sales`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ selectedItems })
    });

    return await res.json();
}
