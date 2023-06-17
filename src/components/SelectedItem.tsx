import React, { useEffect, useState } from 'react'
import { Product } from '@prisma/client';


const SelectedItem = ({ items, removeItem }: { items: Product[], removeItem: (id: string) => void }) => {
	const [total, setTotal] = useState<number>(0)

	useEffect(() => {
		const totalPrice = items.reduce((accumulator, currentItem) => {
			return accumulator + currentItem.price;
		}, 0);

		setTotal(Number(totalPrice.toFixed(2)))
	}, [items])
	return (
		<>
		<div className='flex flex-col justify-between h-full px-2'>
			<div className='overflow-auto h-[calc(100vh-60px)] px-2' >
				<ul className="flex flex-col divide-y divide-gray-700">
					{items?.length === 0 && <p className='mb-4'>No product selected</p>}
					{items.map((i: Product) => <li className="flex flex-col py-6 sm:flex-row sm:justify-between">
						<div className="flex w-full space-x-2 sm:space-x-4">
							<img className="flex-shrink-0 object-cover w-20 h-20 dark:border-transparent rounded outline-none sm:w-32 sm:h-32 dark:bg-gray-500" src={i.image} alt="Polaroid camera" />
							<div className="flex flex-col justify-between w-full pb-4">
								<div className="flex justify-between w-full pb-2 space-x-2">
									<div className="space-y-1">
										<h3 className="text-lg font-semibold leadi sm:pr-8">{i.title}</h3>
									</div>
									<div className="text-right">
										<p className="text-lg font-semibold">RM {i.price}</p>
									</div>
								</div>
								<div className="flex text-sm divide-x">
									<button type="button" className="flex items-center px-2 py-1 pl-0 space-x-1" onClick={() => removeItem(i.id)}>
										<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-4 h-4 fill-current">
											<path d="M96,472a23.82,23.82,0,0,0,23.579,24H392.421A23.82,23.82,0,0,0,416,472V152H96Zm32-288H384V464H128Z"></path>
											<rect width="32" height="200" x="168" y="216"></rect>
											<rect width="32" height="200" x="240" y="216"></rect>
											<rect width="32" height="200" x="312" y="216"></rect>
											<path d="M328,88V40c0-13.458-9.488-24-21.6-24H205.6C193.488,16,184,26.542,184,40V88H64v32H448V88ZM216,48h80V88H216Z"></path>
										</svg>
										<span>Remove</span>
									</button>
								</div>
							</div>
						</div>
					</li>)}

				</ul>
			</div>
			<div>
				<div className="space-y-1 text-right">
					<p>Total amount:
						<span className="font-semibold">RM {total}</span>
					</p>

				</div>
				<div className="flex justify-end space-x-4">

					<button type="button" className="px-6 py-2 border rounded-md bg-green-500 w-full text-white">
						<span className="sr-only sm:not-sr-only">Pay</span>
					</button>
				</div>
			</div>
		</div>

		</>
	)
}

export default SelectedItem