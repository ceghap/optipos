export interface DeductedProduct {
    sku: string,
    quantity: number
}

export const sendDeductedProducts = async (products: DeductedProduct[]) => {
    const res = await fetch(`${process.env.OPTISTOCK_URL}/api/items/update`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ products })
    });

    return await res.json();
}

export const fetchItems = async (): Promise<any> => {
    const res = await fetch(`${process.env.OPTISTOCK_URL}/api/items`);

    return await res.json();
}

export const syncProducts = async (): Promise<any> => {
    const res = await fetch(`/api/inventory/sync/all`);

    return await res.json();
}
