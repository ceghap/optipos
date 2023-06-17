import SelectedItem from "@/components/SelectedItem";
import PosLayout from "@/components/layouts/PosLayout";
import { useQuery } from "@tanstack/react-query";
import { Hand } from "lucide-react";
import { useState } from 'react'
import { fetchProducts } from "src/actions/product";
import { Product } from "src/actions/product";

const PosIndex = () => {

  
  const [selectedItem, setSelectedItem] = useState<Product[]>([])
  const [searchValue, setSearchValue] = useState<string>('')
  
  const { data } = useQuery({ queryKey: ['products', searchValue], queryFn: () => fetchProducts(searchValue) })

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


  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  return (
    <PosLayout>
      <div>
        <div className="p-2 ">
          <input className="w-full px-3 py-2 border rounded-md dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100" placeholder="Search..." onChange={handleSearchChange}/>
        </div>
        <div className="flex flex-row flex-nowrap justify-start content-stretch ">
          <div className="bg-gray-100 w-4/6 overflow-auto h-[calc(100vh-60px)] p-4 flex flex-wrap justify-between space-y-4">

            {data && data.map((d: Product) =>
              <div key={d.id} className="w-52 bg-white p-4 inline-block">
                <div className="w-full h-auto flex justify-center items-center">
                  <img src={d.image} className="flex-shrink-0 object-cover w-20 h-20 dark:border-transparent rounded outline-none sm:w-32 sm:h-32 dark:bg-gray-500" />
                </div>
                <p className="w-48 text-ellipsis overflow-hidden whitespace-nowrap h-6">{d.title}</p>
                <p className="font-bold text-lg">RM {d.price}</p>
                <button className="px-8 py-3 w-full bg-yellow-400 font-semibold rounded dark:bg-gray-100 dark:text-gray-800" onClick={() => onAddItem(d.id)}>Add</button>
              </div>
            )}

          </div>
          <div className="w-2/6 h-[calc(100vh-60px)] overflow-auto">
            <SelectedItem items={selectedItem} removeItem={removeItem} />
          </div>
        </div>

      </div>
    </PosLayout>
  );
};

export default PosIndex;
