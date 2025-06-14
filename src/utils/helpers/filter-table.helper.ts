import { RankingInfo, rankItem, compareItems } from "@tanstack/match-sorter-utils"
import { ColumnDef, ColumnFilter, ColumnHelper, FilterFn, SortingFn, getCoreRowModel, getFilteredRowModel, sortingFns, useReactTable } from "@tanstack/react-table"

declare module '@tanstack/react-table' {
  interface FilterFns {
    fuzzy: FilterFn<unknown>
  }
  interface FilterMeta {
    itemRank: RankingInfo
  }
}

export const fuzzyFilter: FilterFn<any> = (row, columnId, value, addMeta) => {
  // Rank the item
  const itemRank = rankItem(row.getValue(columnId), value)

  // Store the itemRank info
  addMeta({
    itemRank,
  })

  // Return if the item should be filtered in/out
  return itemRank.passed
}

export const fuzzySort: SortingFn<any> = (rowA, rowB, columnId) => {
  let dir = 0

  // Only sort by rank if the column has ranking information
  if (rowA.columnFiltersMeta[columnId]) {
    dir = compareItems(
      rowA.columnFiltersMeta[columnId]?.itemRank!,
      rowB.columnFiltersMeta[columnId]?.itemRank!
    )
  }

  // Provide an alphanumeric fallback for when the item ranks are equal
  return dir === 0 ? sortingFns.alphanumeric(rowA, rowB, columnId) : dir
}


type UseFilterTableProps<T> = {
  data: T[],
  columns: ColumnDef<T, any>[],
  columnFilters?: ColumnFilter[],
  globalFilter: string,
  setColumnFilters?: React.Dispatch<React.SetStateAction<ColumnFilter[]>>,
  setGlobalFilter: React.Dispatch<React.SetStateAction<string>>,
}

// TODO
export default function useFilterTable<T>({
  data,
  columns,
  columnFilters,
  globalFilter,
  setColumnFilters,
  setGlobalFilter
}: UseFilterTableProps<T>) {
  console.log(columns, data, globalFilter)
  return useReactTable({
    columns,
    data: data,
    filterFns: {
      fuzzy: fuzzyFilter,
    },
    state: {
      columnFilters: columnFilters ?? undefined,
      globalFilter
    },
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnFiltersChange: setColumnFilters ?? undefined,
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: fuzzyFilter,
  });
}