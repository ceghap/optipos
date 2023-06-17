import SelectedItem from "@/components/SelectedItem";
import PosLayout from "@/components/layouts/PosLayout";
import { useQuery } from "@tanstack/react-query";
import { useState } from 'react'
import { fetchProducts, Product } from "src/actions/product";
import Image from 'next/image'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../../components/ui/card";
import { Button } from "../../components/ui/button";

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

  const removeItem = (id: number) => {
    const indexToRemove = selectedItem.findIndex(item => item.id === id);
    if (indexToRemove > -1) {
      setSelectedItem([
        ...selectedItem.slice(0, indexToRemove),
        ...selectedItem.slice(indexToRemove + 1),
      ]);
    }
  };
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  return (
    <PosLayout>
      <div className="container mx-auto p-4 grid grid-cols-4 gap-4">
        <div className="col-span-3">
          <div className="w-full mb-4">
            <input
              className="w-full p-2 border-2 border-gray-300 bg-white h-8 px-4 pr-12 rounded-lg text-sm focus:outline-none"
              type="search"
              name="search"
              placeholder="Search for products..."
              onChange={handleSearchChange}
            />
          </div>
          <div className="w-full grid grid-cols-3 gap-4">
            {data && data?.map((d: Product) =>
              <Card key={d.id} className="flex flex-col">
                <CardHeader className="p-2 pb-0 flex-grow">
                  <Image
                    src={d.image}
                    alt={d.title}
                    width={100}
                    height={100}
                  />
                </CardHeader>
                <CardContent className="p-2 flex-grow">
                  <CardTitle className="text-base">{d.title}</CardTitle>
                  <CardDescription className="text-sm">RM {d.price}</CardDescription>
                </CardContent>
                <CardFooter className="p-2 pt-0 border-t border-gray-200 bg-gray-50">
                  <Button
                    className="w-full py-1 px-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    onClick={() => onAddItem(d.id)}
                  >
                    Add
                  </Button>
                </CardFooter>
              </Card>
            )}
          </div>
        </div>
        <div className="col-span-1">
          <SelectedItem items={selectedItem} removeItem={removeItem} />
          <div className="sticky bottom-0 p-4">
            {/* <Button
              className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              Pay
            </Button> */}
          </div>
        </div>
      </div>
    </PosLayout>
  );
};

export default PosIndex;
