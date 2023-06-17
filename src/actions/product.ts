import { Product as PrismaProduct } from "@prisma/client";
export interface Product {
  id: number,
  title: string,
  price: number,
  category: string,
  description: string,
  image: string
}

export const fetchFakeProducts = async (): Promise<Product[]> => {
  const res = await fetch('https://fakestoreapi.com/products');

  return await res.json();
}


export const fetchProducts = async (searchValue: string): Promise<PrismaProduct[]> => {
  const res = await fetch(`/api/products?title=${searchValue}`);

  return await res.json();
}

export const fetchProductPaginated = async (searchValue: string, page: number = 1, size: number = 10): Promise<PrismaProduct[]> => {
  const res = await fetch(`/api/products/paginated?title=${searchValue}&page=${page}&size=${size}`);

  return await res.json();
}
