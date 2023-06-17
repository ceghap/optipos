import PrivateLayout from "@/components/layouts/PrivateLayout";
import { useQuery } from "@tanstack/react-query";
import { Product } from "@prisma/client";
import { useState } from 'react'
import {
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    useReactTable,
  } from '@tanstack/react-table'
import { fetchProductPaginated } from "src/actions/product";
import { syncProducts } from "src/actions/inventory";

const Stock = () => {
    const [searchValue, setSearchValue] = useState<string>('')
    const { data } = useQuery({ queryKey: ['paginatedProducts', searchValue], queryFn: () => fetchProductPaginated(searchValue) })
    const { isLoading, refetch } = useQuery({ queryKey: ['products'], queryFn: () => syncProducts(), enabled: false, })
    const columnHelper = createColumnHelper<Product>()

const columns = [

  columnHelper.accessor(row => row.title, {
    id: 'lastName',
    cell: info => info.getValue(),
    header: () => <span>Last Name</span>,
    footer: info => info.column.id,
  }),
  
  columnHelper.accessor('image', {
    header: () => <span>Visits</span>,
    cell: info => <img className="w-10" src={info.getValue()} />,
    footer: info => info.column.id,
  }),
  columnHelper.accessor('price', {
    header: () => 'Price',
    cell: info => `RM ${info.renderValue()}`,
    footer: info => info.column.id,
  }),
  columnHelper.accessor('stockCount', {
    header: 'Stock',
    footer: info => info.column.id,
  }),
  columnHelper.accessor('SKU', {
    header: 'SKU',
    footer: info => info.column.id,
  }),
]

const table = useReactTable({
    data: data!,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })


    return (
    <PrivateLayout>
      <div className="flex justify-between mb-4 items-center">
        <h2 className="font-medium text-lg">Inventory</h2>
        <button onClick={()=>refetch()} className="ml-2 cursor-pointer px-8 py-3 text-white font-semibold rounded bg-green-500 dark:bg-gray-100 dark:text-gray-800">Sync with OptiStock</button>
      </div>

      {/* {isLoading && <div className="absolute top-0 left-0 right-0 bottom-0"><div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin dark:border-violet-400"></div></div>} */}

     {data &&  
     <div className="overflow-x-auto">
<table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
        <thead className="ltr:text-left rtl:text-right">
          {table.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map(header => (
                <th key={header.id} className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody className="divide-y divide-gray-200">
          {table.getRowModel().rows.map(row => (
            <tr key={row.id} className="odd:bg-gray-50">
              {row.getVisibleCells().map(cell => (
                <td key={cell.id} className="whitespace-nowrap px-4 py-2 text-gray-700">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
        <tfoot className="ltr:text-left rtl:text-right">
          {table.getFooterGroups().map(footerGroup => (
            <tr key={footerGroup.id}>
              {footerGroup.headers.map(header => (
                <th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.footer,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </tfoot>
      </table>

     </div>
 }
    </PrivateLayout>
  );
};

export default Stock;
