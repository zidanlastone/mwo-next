import { HeaderGroup, flexRender } from "@tanstack/react-table";

export default function RowHeader<T>(headerGroup: HeaderGroup<T>) {
  return (
    <tr id={headerGroup.id}>
      {headerGroup.headers.map((header, index) => {
        return (
          <th key={header.id + '-' + index} colSpan={header.colSpan} className="border-b font-medium py-4 pl-8 pt-0 pb-3 text-slate-400 text-left">
            <div 
              className={"flex flex-row text-center" + header.column.getCanSort() ? 'cursor-pointer select-none' : ''} 
              onClick={header.column.getToggleSortingHandler()}
              title={
                header.column.getCanSort()
                ? header.column.getNextSortingOrder() === 'asc'
                  ? 'Sort ascending'
                  : header.column.getNextSortingOrder() === 'desc'
                    ? 'Sort descending'
                    : 'Clear sort'
                : undefined
              }>
              {header.isPlaceholder ? null : flexRender(
                header.column.columnDef.header,
                header.getContext()
              )}

              {{
                asc: ' 🔼',
                desc: ' 🔽',
              }[header.column.getIsSorted() as string] ?? null}

            </div>
          </th>
        )
      }
      )}
    </tr>
  )
}