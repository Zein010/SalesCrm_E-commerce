"use client"

import { ColumnDef, ColumnFiltersState, flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, Row, useReactTable, VisibilityState } from "@tanstack/react-table"
import { ArrowUpDown, Biohazard, ChevronDown, ChevronLast, ChevronLeft, MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuSeparator, DropdownMenuTrigger, } from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ReactNode, useEffect, useState } from "react"


import axios from "@/lib/axios";
import { Link } from "@inertiajs/react"




export default function Datatable({ config }: { config: { columnConf: any, url: string, addUrl?: string, addSetState?: any } }) {
  const [paginationParam, setPaginationParam] = useState<{ page: number, per_page: number }>({ page: 1, per_page: 10 });

  const [data, setData] = useState({ data: [], last_page: 0, total: 0 });
  useEffect(() => {
    axios.get(config.url, { params: { ...paginationParam } })
      .then(response => {
        setData(response.data)
      })
      .catch(error => {
        console.error('Error fetching data:', error)
      })
  }, [paginationParam])

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
  const columns: ColumnDef<unknown, any>[] = config.columnConf.map((column: { datetime: boolean | null, header: ReactNode, headerFormatter: Function | null, currency: boolean | null, formatter: Function | null, selectable: boolean | null, name: string, friendlyName: string, filterOptions: [] | null }) => {
    if (column.selectable) {
      return {
        accessorKey: column.name,
        id: column.name,
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
        columnConf.cell = ({ row }: any) => {
          return column.formatter!(row)
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
      } else if (column.datetime) {
        columnConf.cell = ({ row }: { row: Row<unknown> }) => { return (row.getValue(column.name) as string).split(".")[0].replace("T", " ") }

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
    data: data.data,
    columns,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    manualPagination: true,
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
      <div className="flex justify-between pb-4">
        <div className="flex gap-2">

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">{filterField.friendlyName} <ChevronDown /></Button>
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
                <Button variant="outline">{columnFilterOptions.filter(option => option.value == columnFilter)[0].friendlyName} <ChevronDown /></Button>
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
        <div className="flex gap-1">
          {

            config.addUrl ? <Link href={config.addUrl}>
              <Button variant="outline">Add New</Button>
            </Link> : (config.addSetState ? <Button onClick={() => config.addSetState(true)} variant="outline">Add New</Button> : "")
          }
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
        </div></div>
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
          {table.getFilteredSelectedRowModel().rows.length} of {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="flex gap-1 item-stretch">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">Show: {paginationParam.per_page} <ChevronDown /></Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent >
              <DropdownMenuLabel>Per Page:</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuRadioGroup value={paginationParam.per_page.toString()} onValueChange={(value: string) => { setPaginationParam({ page: 1, per_page: parseInt(value) }) }}>

                <DropdownMenuRadioItem value="5">5</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="10">10</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="50">50</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="100">100</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="500">500</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="1000">1000</DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button
            variant="outline"
            onClick={() => setPaginationParam((old) => ({ per_page: old.per_page, page: old.page - 1 }))}
            disabled={paginationParam.page == 1}
          >
            Previous
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button disabled={data.total < paginationParam.per_page} variant="outline">Page: {paginationParam.page} <ChevronDown /></Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent >
              <DropdownMenuLabel>Page:</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuRadioGroup value={paginationParam.page.toString()} onValueChange={(value: string) => { setPaginationParam((old) => ({ page: parseInt(value), per_page: old.per_page })) }}>
                {Array.from({ length: data.last_page }, (_, i) => i + 1).map((i) => {

                  return <DropdownMenuRadioItem value={i.toString()}>{i}</DropdownMenuRadioItem>
                })}
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button
            variant="outline"

            onClick={() => setPaginationParam((old) => ({ per_page: old.per_page, page: old.page + 1 }))}

            disabled={paginationParam.page == data.last_page}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}
