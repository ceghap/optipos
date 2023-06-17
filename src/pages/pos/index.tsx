import SelectedItem from "@/components/SelectedItem";
import PosLayout from "@/components/layouts/PosLayout";
import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { fetchProducts } from "src/actions/product";
import { Product } from "@prisma/client";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Skeleton } from "../../components/ui/skeleton";
import { addSale } from "src/actions/sale";
import { useMutation } from "@tanstack/react-query";

const PosIndex = () => {
  const [selectedItem, setSelectedItem] = useState<Product[]>([]);
  const [payModal, setPayModal] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState<string>("");
  const { data, isLoading } = useQuery({
    queryKey: ["products", searchValue],
    queryFn: () => fetchProducts(searchValue),
  });

  const mutation = useMutation(addSale);

  const [total, setTotal] = useState<number>(0);

  useEffect(() => {
    let totalPrice = selectedItem.reduce((accumulator, currentItem) => {
      return accumulator + currentItem.price;
    }, 0);

    setTotal(Number(totalPrice.toFixed(2)));
  }, [selectedItem]);

  const onAddItem = (id: string) => {
    const item = data?.find((d) => d.id === id);
    if (item) {
      setSelectedItem((selectedItem) => [...selectedItem, item]);
    }
  };

  const removeItem = (id: string) => {
    const indexToRemove = selectedItem.findIndex((item) => item.id === id);
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

  const handlePay = () => {
    setPayModal(true);
  };

  const onOkPay = async () => {
    console.log(selectedItem)
    await mutation.mutate(selectedItem);
    setPayModal(false);
    setSelectedItem([])
  };

  return (
    <PosLayout>
      <div className="px-4 mx-auto grid grid-cols-4">
        <div className="col-span-3">
          <div className="w-full mb-4 pt-4">
            <input
              className="w-full p-2 border-2 border-gray-300 bg-white h-8 px-4 pr-12 rounded-lg text-sm focus:outline-none"
              type="search"
              name="search"
              placeholder="Search for products..."
              onChange={handleSearchChange}
            />
          </div>
          <div className="w-full grid grid-cols-3 gap-4 overflow-auto h-[calc(100vh-80px)]">
            {isLoading
              ? Array(10)
                  .fill(0)
                  .map((_, idx) => <Skeleton key={idx} className="h-32" />) // display 10 skeletons while data is loading
              : data &&
                data?.map((d: Product) => (
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
                      <p className="text-xs">{d.SKU} <span>({d.stockCount})</span></p> 
                      <CardTitle className="text-base">{d.title}</CardTitle>
                      <CardDescription className="text-sm">
                        RM {d.price}
                      </CardDescription>
                    </CardContent>
                    {d.stockCount === 0 && <p className="text-red-500 p-2">Not available</p>}
                      {d.stockCount > 0 && d.stockCount <= 5 && <p className="text-blue-700 p-2">Only {d.stockCount} left!</p>}
                    <CardFooter className="p-2 pt-0 border-t border-gray-200 bg-gray-50">
                     
                      <Button
                        disabled={d.stockCount === 0}
                        className=" w-full py-1 px-2 border disabled:opacity-50 border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        onClick={() => onAddItem(d.id)}
                      >
                        Add
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
          </div>
        </div>
        <div className="col-span-1">
          <SelectedItem
            items={selectedItem}
            removeItem={removeItem}
            handlePay={handlePay}
            total={total}
          />
        </div>
      </div>

      {payModal && (
        <div className="bg-black absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center bg-opacity-95">

        <div className="flex bg-white flex-col max-w-md gap-2 p-6 rounded-md shadow-md dark:bg-gray-900 dark:text-gray-100">
          <h2 className="text-xl font-semibold leadi tracking text-center">
            Pay for RM {total}
          </h2>
        
          <div className="flex flex-col justify-center gap-3 mt-6 sm:flex-row">
            <button className="px-6 py-2 rounded-sm" onClick={() =>   setPayModal(false)}>Cancel</button>
            <button onClick={onOkPay} className="px-6 py-2 rounded-sm shadow-sm dark:bg-violet-400 dark:text-gray-900">
              OK
            </button>
          </div>
        </div>
        </div>
      )}
    </PosLayout>
  );
};

export default PosIndex;
