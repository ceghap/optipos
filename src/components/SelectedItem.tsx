import React, { useEffect, useState } from 'react'
import { Product } from "src/actions/product";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import Image from 'next/image'

const SelectedItem = ({ items, removeItem }: { items: Product[], removeItem: (id: number) => void }) => {
	const [total, setTotal] = useState<number>(0)

	useEffect(() => {
		let totalPrice = items.reduce((accumulator, currentItem) => {
			return accumulator + currentItem.price;
		}, 0);

		setTotal(Number(totalPrice.toFixed(2)))
	}, [items])

	let uniqueItems = [...new Set(items)];

	return (
		<div className='flex flex-col justify-between h-full px-2'>
			<div className='overflow-auto h-[calc(100vh-60px)] px-2' >
				{uniqueItems.length === 0 ? <p className='mb-4'>No product selected</p> :
					uniqueItems.map((i: Product) => (
						<Card key={i.id} className="relative flex flex-col">
							<CardHeader className="p-2 pb-0 flex-grow">
								<Image
									src={i.image}
									alt={i.title}
									width={100}
									height={100}
								/>
								<span className="absolute top-0 right-0 bg-red-500 text-white rounded-full h-6 w-6 text-center">
									x{items.filter(item => item.id === i.id).length}
								</span>
							</CardHeader>
							<CardContent className="p-2 flex-grow">
								<CardTitle className="text-lg font-semibold leading-6 sm:pr-8">{i.title}</CardTitle>
								<CardDescription className="text-lg font-semibold">RM {i.price}</CardDescription>
							</CardContent>
							<CardFooter className="p-2 pt-0 border-t border-gray-200 bg-gray-50">
								<Button
									className="w-full py-1 px-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
									onClick={() => removeItem(i.id)}
								>
									Remove
								</Button>
							</CardFooter>
						</Card>
					))}
			</div>
			<div className="flex flex-col space-x-4 ">
				<p className="ml-4 mb-4">Total amount:
					<span className="font-semibold">RM {total}</span>
				</p>
				<Button
					className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
				>
					Pay
				</Button>
			</div>
		</div>
	)
}

export default SelectedItem
