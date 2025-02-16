"use client";

import {
  type ColumnDef,
  type Row,
  type RowSelectionState,
  type VisibilityState,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useRef, useState } from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { useClickOutside } from "~/hooks/useClickOutside";
import { useSelectRow } from "~/hooks/useSelectedRow";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  onRowDoubleClick?: (row: Row<TData>) => void | Promise<void>;
  resetRowSelectionOnClickOutside?: boolean;
  selectRowOnClick?: boolean;
}

export default function DataTable<TData, TValue>({
  columns,
  data,
  onRowDoubleClick,
  resetRowSelectionOnClickOutside,
  selectRowOnClick,
}: DataTableProps<TData, TValue>) {
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    // column visibility
    onColumnVisibilityChange: setColumnVisibility,
    // row selection
    enableMultiRowSelection: false,
    onRowSelectionChange: setRowSelection,
    // table state
    state: {
      columnVisibility,
      rowSelection,
    },
  });

  const { handleClick: handleRowClick } = useSelectRow<Row<TData>>({
    onClick: (row) => {
      if (selectRowOnClick) {
        row.toggleSelected(true);
      }
    },
    onDoubleClick: (row) => {
      if (selectRowOnClick) {
        row.toggleSelected(true);
      }
      void onRowDoubleClick?.(row);
    },
  });

  const tableRef = useRef<HTMLTableElement>(null);

  useClickOutside(tableRef, () => {
    if (!resetRowSelectionOnClickOutside) return;
    table.resetRowSelection();
  });

  return (
    <div>
      <Table ref={tableRef}>
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
                          header.getContext(),
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() ? "selected" : "idle"}
                onClick={() => {
                  handleRowClick(row);
                }}
                className="group"
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
  );
}
