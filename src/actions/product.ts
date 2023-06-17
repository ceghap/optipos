export interface Product {
  id: number,
  title: string,
  price: number,
  category: string,
  description: string,
  image: string
}

export const fetchProducts = async (): Promise<Product[]> => {
  const res = await fetch('https://fakestoreapi.com/products');

  return await res.json();
}
