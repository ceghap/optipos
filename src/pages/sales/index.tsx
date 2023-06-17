import PrivateLayout from "@/components/layouts/PrivateLayout";
import { useQuery } from "@tanstack/react-query";
import { Sale } from "@prisma/client";
import { useState } from 'react'
import {
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    useReactTable,
  } from '@tanstack/react-table'
import { fetchSales } from "src/actions/sale";

const Sales = () => {
    const [id, setId] = useState<string>('')
    const { data } = useQuery({ queryKey: ['sales', id], queryFn: () => fetchSales(id) })
    const columnHelper = createColumnHelper<Sale>()

const columns = [

  columnHelper.accessor(row => row.id, {
    id: 'id',
    cell: info => info.getValue(),
    header: () => <span>Id</span>,
    footer: info => info.column.id,
  }),
  
  columnHelper.accessor('timestamp', {
    header: () => <span>Timestamp</span>,
    cell: info => info.getValue(),
    footer: info => info.column.id,
  }),
  columnHelper.accessor('total', {
    header: () => 'Total',
    cell: info => `RM ${info.renderValue()}`,
    footer: info => info.column.id,
  })
]

const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  setId(event.target.value);
};


const table = useReactTable({
    data: data!,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })


    return (
    <PrivateLayout>
      <div className="flex justify-between mb-4 items-center">
        <h2 className="font-medium text-lg">Sales</h2>
      </div>

      <div className="w-full mb-4 pt-4">
            <input
              className="w-full p-2 border-2 border-gray-300 bg-white h-8 px-4 pr-12 rounded-lg text-sm focus:outline-none"
              type="search"
              name="search"
              placeholder="Search for products..."
              onChange={handleSearchChange}
            />
          </div>

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

export default Sales;
