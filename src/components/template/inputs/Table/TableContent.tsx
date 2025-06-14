import React, { ReactNode, useState } from 'react'
import { ColumnDef, ColumnFilter, PaginationState, SortingState, Table, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from '@tanstack/react-table';
import { fuzzyFilter } from '@/utils/helpers/filter-table.helper';
import DebouncedInput from '../DebounceInput';
import RowContent from './RowContent';
import RowHeader from './RowHeader';

type TableContentProps<T> = {
  data: T[],
  columns: ColumnDef<T, any>[],
  headerAction?: ReactNode,
  // columnFilters?: ColumnFilter[],
  // setColumnFilters?: React.Dispatch<React.SetStateAction<ColumnFilter[]>>,
}

function TableContent<T>({
  columns, 
  data = [], 
  headerAction, 
  // columnFilters, 
  // setColumnFilters
}: TableContentProps<T>) {
  const [globalFilter, setGlobalFilter] = useState('');
  const [sorting, setSorting] = useState<SortingState>([]);

  const [pagination, setPagination] = React.useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  })

  const table = useReactTable({
    columns,
    data: data,
    filterFns: {
      fuzzy: fuzzyFilter,
    },
    state: {
      sorting,
      pagination,
      globalFilter,
      // columnFilters: columnFilters ?? []
    },
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    // onColumnFiltersChange: setColumnFilters ?? undefined,
    onGlobalFilterChange: setGlobalFilter,
    onPaginationChange: setPagination,
    onSortingChange: setSorting,
    globalFilterFn: fuzzyFilter,
  });
  
  return (
    <section className="p-4 sm:p-8 w-full bg-white shadow sm:rounded-lg">

      <div className="my-3 md:mx-2 flex flex-col md:flex-row md:justify-between">
        {headerAction}
        <div className="md:mx-2 my-2 order-last">
          <DebouncedInput
            value={globalFilter}
            onChange={value => setGlobalFilter(String(value))}
            className="px-2 py-2 font-sm shadow border rounded"
            placeholder="Cari Data Global"
          />
        </div>
      </div>

      <div className="w-full overflow-x-auto">
        <table className="table-auto w-full">
          <thead>
            {table.getHeaderGroups().map((headerGroup, index) => <RowHeader key={headerGroup.id + '-' + index} {...headerGroup} />)}
          </thead>
          <tbody className="bg-white">
            {table.getRowModel().rows.map(row => <RowContent key={row.id} {...row} />)}
          </tbody>
        </table>

        <div className="flex items-center gap-2">
        <button
          className="border rounded p-1"
          onClick={() => table.firstPage()}
          disabled={!table.getCanPreviousPage()}
        >
          {'<<'}
        </button>
        <button
          className="border rounded p-1"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          {'<'}
        </button>
        <button
          className="border rounded p-1"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          {'>'}
        </button>
        <button
          className="border rounded p-1"
          onClick={() => table.lastPage()}
          disabled={!table.getCanNextPage()}
        >
          {'>>'}
        </button>
        <span className="flex items-center gap-1">
          <div>Page</div>
          <strong>
            {table.getState().pagination.pageIndex + 1} of{' '}
            {table.getPageCount().toLocaleString()}
          </strong>
        </span>
        <select
          className="border-0 rounded"
          value={table.getState().pagination.pageSize}
          onChange={e => {
            table.setPageSize(Number(e.target.value))
          }}
        >
          {[10, 20, 30, 40, 50].map(pageSize => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>
      </div>

    </section>
  )
}

export default TableContent