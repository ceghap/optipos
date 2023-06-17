import SelectedItem from "@/components/SelectedItem";
import PosLayout from "@/components/layouts/PosLayout";
import { useQuery } from "@tanstack/react-query";
import { useState } from 'react'

export interface Product {
  id: number,
  title: string,
  price: number,
  category: string,
  description: string,
  image: string
}

const fetchProducts = async (): Promise<Product[]> => {
  const res = await fetch('https://fakestoreapi.com/products');

  return await res.json();
}



const PosIndex = () => {

  const { data } = useQuery({ queryKey: ['products'], queryFn: fetchProducts })

  const [selectedItem, setSelectedItem] = useState<Product[]>([])

  const onAddItem = (id: number) => {

    const item = data?.find(d => d.id === id);

    if (item) {
      setSelectedItem(selectedItem => [...selectedItem, item])
    }

    console.log(selectedItem)

  }

  const removeItem = (id:number) => {

    const newItem= selectedItem.filter((item: Product) => item.id !== id);

    setSelectedItem(newItem)
  }

  return (
    <PosLayout>
      <div>
        <div className="p-2 ">
          <input className="w-full px-3 py-2 border rounded-md dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100" placeholder="Search..." />
        </div>
        <div className="flex items-baseline flex-row flex-nowrap justify-start content-stretch ">
          <div className="bg-gray-100 w-4/6 overflow-auto h-[calc(100vh-60px)] p-4 flex flex-wrap justify-between space-y-4">

            {data && data.map((d: Product) =>
              <div key={d.id} className="w-52 bg-white p-4">
                <div className="w-36 h-36 flex justify-center items-center">
                  <img src={d.image} className="w-full h-full" />
                </div>
                <p className="text-ellipsis overflow-hidden w-52">{d.title}</p>
                <p>{d.price}</p>
                <button className="px-8 py-3 font-semibold rounded dark:bg-gray-100 dark:text-gray-800" onClick={() => onAddItem(d.id)}>Add</button>
              </div>
            )}

          </div>
          <div className=" w-2/6 p-4 h-[calc(100vh-60px)] overflow-auto">
            <SelectedItem items={selectedItem} removeItem={removeItem} />
          </div>
        </div>

      </div>
    </PosLayout>
  );
};

export default PosIndex;
