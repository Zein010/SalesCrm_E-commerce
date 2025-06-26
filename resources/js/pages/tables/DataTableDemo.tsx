"use client"

import { ColumnDef, ColumnFiltersState, flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, Row, useReactTable, VisibilityState } from "@tanstack/react-table"
import { ArrowUpDown, Biohazard, ChevronDown, MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuSeparator, DropdownMenuTrigger, } from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ReactNode, useState } from "react"








export default function DataTableDemo({ config }: { config: { columnConf: any, data: any[] } }) {

  const [columnFilterOptions, setColumnFilterOptions] = useState<null | { friendlyName: string, value: string }[]>(null);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>(
    []
  )
  const initialFilterFieldState = { friendlyName: "All", name: "all" };
  const [filterField, setFilterField] = useState<{ friendlyName: string, name: string }>(initialFilterFieldState);
  const [columnFilter, setColumnFilter] = useState<string>("")
  const [globalFilter, setGlobalFilter] = useState<string>("")


  const [columnVisibility, setColumnVisibility] =
    useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = useState({})
  const columns: ColumnDef<unknown, any>[] = config.columnConf.map((column: { header: ReactNode, headerFormatter: Function | null, currency: boolean | null, formatter: Function | null, selectable: boolean | null, name: string, friendlyName: string, filterOptions: [] | null }) => {
    if (column.selectable) {
      return {
        id: "select",
        header: ({ table }: { table: any }) => (
          <Checkbox
            checked={
              table.getIsAllPageRowsSelected() ||
              (table.getIsSomePageRowsSelected() && "indeterminate")
            }
            onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
            aria-label="Select all"
          />
        ),
        cell: ({ row }: { row: any }) => (
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(!!value)}
            aria-label="Select row"
          />
        ),
        enableSorting: false,
        enableHiding: false,
      }
    } else {
      const columnConf: any = {
        accessorKey: column.name,
        header: column.friendlyName,
      }
      if (column.formatter) {
        columnConf.cell = ({ row }: { row: Row<unknown> }) => {
          return column.formatter!(row.getValue(column.name))
        }
      } else if (column.currency) {
        columnConf.cell = ({ row }: { row: Row<unknown> }) => {
          const amount = parseFloat(row.getValue(column.name))

          // Format the amount as a dollar amount
          const formatted = new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
          }).format(amount)

          return <div className="text-right font-medium">{formatted}</div>
        }
      }
      if (column.header) {
        columnConf.header = column.header
      }
      return columnConf;
    }

  })



  // {
  //   id: "actions",
  //   enableHiding: false,
  //   cell: ({ row }) => {
  //     const payment = row.original

  //     return (
  //       <DropdownMenu>
  //         <DropdownMenuTrigger asChild>
  //           <Button variant="ghost" className="h-8 w-8 p-0">
  //             <span className="sr-only">Open menu</span>
  //             <MoreHorizontal />
  //           </Button>
  //         </DropdownMenuTrigger>
  //         <DropdownMenuContent align="end">
  //           <DropdownMenuLabel>Actions</DropdownMenuLabel>
  //           <DropdownMenuItem
  //             onClick={() => navigator.clipboard.writeText(payment.id)}
  //           >
  //             Copy payment ID
  //           </DropdownMenuItem>
  //           <DropdownMenuSeparator />
  //           <DropdownMenuItem>View customer</DropdownMenuItem>
  //           <DropdownMenuItem>View payment details</DropdownMenuItem>
  //         </DropdownMenuContent>
  //       </DropdownMenu>
  //     )
  //   },
  // },




  const table = useReactTable({
    data: config.data,
    columns,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      columnFilters,
      globalFilter,
      columnVisibility,
      rowSelection,
    },
  })
  const setDataFilter = (value: string, field: string) => {
    if (field == "all") {
      setGlobalFilter(value)
    } else {
      setGlobalFilter("")
      table.getColumn(field)?.setFilterValue(value)

    }

  }
  const changeFilterField = (value: string) => {

    var hasOptions = false;
    var options = [{ friendlyName: "All", value: "" }]
    config.columnConf.forEach((column: any) => {
      if (column.name == JSON.parse(value).name && column.filterOptions) {
        hasOptions = true;
        options.push(...(column.filterOptions))
        setColumnFilterOptions(options);
      }
    })
    if (filterField.name != "all") {
      table.resetColumnFilters();
    }

    setFilterField(JSON.parse(value));
    if (hasOptions) {
      if (options.filter(option => option.value == columnFilter).length > 0) {

        setDataFilter(columnFilter, JSON.parse(value).name)

      } else {
        setDataFilter("", JSON.parse(value).name);
      }
    } else {
      setColumnFilterOptions(null);
      setDataFilter(columnFilter, JSON.parse(value).name)
    }
  }
  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        <div className="flex gap-2">

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">{filterField.friendlyName}</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent >
              <DropdownMenuLabel>Filter Options</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuRadioGroup value={JSON.stringify(filterField)} onValueChange={changeFilterField}>
                <DropdownMenuRadioItem value={JSON.stringify(initialFilterFieldState)}>All</DropdownMenuRadioItem>
                {config.columnConf.map((columnConfig: { filterable: boolean, friendlyName: string, name: string }) => { return columnConfig.filterable ? <DropdownMenuRadioItem value={JSON.stringify({ name: columnConfig.name, friendlyName: columnConfig.friendlyName })}>{columnConfig.friendlyName}</DropdownMenuRadioItem> : null })}
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
          {columnFilterOptions ?
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">{columnFilterOptions.filter(option => option.value == columnFilter)[0].friendlyName}</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent >
                <DropdownMenuLabel>{filterField.friendlyName} Options</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuRadioGroup value={columnFilter} onValueChange={(value) => { setDataFilter(value, filterField.name), setColumnFilter(value) }}>

                  {columnFilterOptions.map((filterOption: { friendlyName: string, value: string }) => { return <DropdownMenuRadioItem value={filterOption.value} >{filterOption.friendlyName}</DropdownMenuRadioItem> })}
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>

            : <Input
              placeholder="Filter data..."
              value={columnFilter}
              onChange={(event) => {
                setDataFilter(event.target.value, filterField.name);
                setColumnFilter(event.target.value);
              }
              }
              className="max-w-sm"
            />}

        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns <ChevronDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                )
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border">
        <Table>
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
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="text-muted-foreground flex-1 text-sm">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}
