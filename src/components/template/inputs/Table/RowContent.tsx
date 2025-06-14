import { Row, flexRender } from "@tanstack/react-table";

export default function RowContent<T>(row: Row<T>) {
  return (
    <tr key={row.id}>
      {row.getVisibleCells().map(cell => (
        <td key={cell.id} className="border-b border-slate-100 p-4 pl-8 text-slate-500">
          {flexRender(cell.column.columnDef.cell, cell.getContext())}
        </td>
      ))}
    </tr>
  )
}