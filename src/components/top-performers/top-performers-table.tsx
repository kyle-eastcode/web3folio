'use client';

import {
  ColumnDef,
  SortingState,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useState } from "react";
import { ArrowDown, ArrowUp, ArrowUpDown } from "lucide-react";
import { cn } from "@/lib/utils";

export type TopPerformersTableEntry = {
  id: string;
  asset: string;
  icon: string;
  change: number;
  price: number;
  liquidity: number;
}

export const columns: ColumnDef<TopPerformersTableEntry>[] = [
  {
    accessorKey: "asset",
    header: ({ column }) => {
      return (
        <div
          className="hover:no-underline hover:cursor-pointer flex"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Asset
          {column.getIsSorted() ? (
            column.getIsSorted() === 'asc' ? <ArrowDown className="ml-2 h-4 w-4" /> : <ArrowUp className="ml-2 h-4 w-4" />
          ) : (
            <ArrowUpDown className="ml-2 h-4 w-4" />
          )}
        </div>
      )
    },
  },
  {
    accessorKey: "change",
    header: ({ column }) => {
      return (
        <div
          className="hover:no-underline hover:cursor-pointer flex"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          % Change
          {column.getIsSorted() ? (
            column.getIsSorted() === 'asc' ? <ArrowDown className="ml-2 h-4 w-4" /> : <ArrowUp className="ml-2 h-4 w-4" />
          ) : (
            <ArrowUpDown className="ml-2 h-4 w-4" />
          )}
        </div>
      )
    },
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("change"))
      const positive = Math.sign(amount) == 1 ? true : false;
      const formatted = <div className={cn("font-medium", positive ? 'text-green-500' : 'text-red-500')}>
        {/* {positive ? '+' : '-'} */}
        {amount} %
      </div>

      return <div className="font-medium">{formatted}</div>
    },
  },
  {
    accessorKey: "price",
    header: ({ column }) => {
      return (
        <div
          className="hover:no-underline hover:cursor-pointer flex"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Price
          {column.getIsSorted() ? (
            column.getIsSorted() === 'asc' ? <ArrowDown className="ml-2 h-4 w-4" /> : <ArrowUp className="ml-2 h-4 w-4" />
          ) : (
            <ArrowUpDown className="ml-2 h-4 w-4" />
          )}
        </div>
      )
    },
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("price"))
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount)

      return <div className="font-medium">{formatted}</div>
    },
  },
  {
    accessorKey: "liquidity",
    header: ({ column }) => {
      return (
        <div className="flex justify-end">
          <div
            className="hover:no-underline hover:cursor-pointer flex"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Liquidity
            {column.getIsSorted() ? (
              column.getIsSorted() === 'asc' ? <ArrowDown className="ml-2 h-4 w-4" /> : <ArrowUp className="ml-2 h-4 w-4" />
            ) : (
              <ArrowUpDown className="ml-2 h-4 w-4" />
            )}
          </div>
        </div>
      )
    },
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("liquidity"))
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount)

      return <div className="text-right font-medium">{formatted}</div>
    },
  },
];

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
};

export function TopPerformersTable<TData, TValue>({
  data,
  columns,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([])

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
    },
  });

  return (
    <div className="overflow-hidden rounded-md border">
      <Table className="bg-secondary">
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                  </TableHead>
                )
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}