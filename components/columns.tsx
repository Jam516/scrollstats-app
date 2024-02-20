"use client"

import { ColumnDef } from "@tanstack/react-table";

import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { DataTableColumnHeader } from "./data-table-column-header"
import { categories } from "@/components/data"
import { App } from "@/components/schema"
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import numeral from 'numeral';

// export type Apps = {
//     PROJECT: string
//     ETH_FEES: number
//     ETH_FEES_GROWTH: number
//     TRANSACTIONS: number
//     TRANSACTIONS_GROWTH: number
//     WALLETS: number
//     WALLETS_GROWTH: number
//     TVL: number
//     CATEGORY: string
// }

export const columns: ColumnDef<App>[] = [
    {
        accessorKey: "PROJECT",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Project" />
        ),
        cell: ({ row }) => <div className="w-[80px]">{row.getValue("PROJECT")}</div>,
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "ETH_FEES",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Gas Fees (ETH)" />
        ),
        cell: ({ row }) => {
            const amount = parseFloat(row.getValue("ETH_FEES"))
            return (
                <div className="max-w-[500px] truncate font-medium">
                    {amount.toFixed(2)}
                </div>
            )
        },
    },
    {
        accessorKey: "ETH_FEES_GROWTH",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Gas Fees Growth" />
        ),
        cell: ({ row }) => {
            const amount = parseFloat(row.getValue("ETH_FEES_GROWTH"))
            return (
                <div className="max-w-[500px] truncate font-medium">
                    {amount.toFixed(0)}%
                </div>
            )
        },
    },
    {
        accessorKey: "TRANSACTIONS",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Transactions" />
        ),
        cell: ({ row }) => {
            const amount = parseFloat(row.getValue("TRANSACTIONS"))
            return (
                <div className="max-w-[500px] truncate font-medium">
                    {amount}
                </div>
            )
        },
    },
    {
        accessorKey: "TRANSACTIONS_GROWTH",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Transactions Growth" />
        ),
        cell: ({ row }) => {
            const amount = parseFloat(row.getValue("TRANSACTIONS_GROWTH"))
            return (
                <div className="max-w-[500px] truncate font-medium">
                    {amount.toFixed(0)}%
                </div>
            )
        },
    },
    {
        accessorKey: "WALLETS",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Wallets" />
        ),
        cell: ({ row }) => {
            const amount = parseFloat(row.getValue("WALLETS"))
            return (
                <div className="max-w-[500px] truncate font-medium">
                    {amount}
                </div>
            )
        },
    },
    {
        accessorKey: "WALLETS_GROWTH",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Wallets Growth" />
        ),
        cell: ({ row }) => {
            const amount = parseFloat(row.getValue("WALLETS_GROWTH"))
            return (
                <div className="max-w-[500px] truncate font-medium">
                    {amount.toFixed(0)}%
                </div>
            )
        },
    },
    {
        accessorKey: "TVL",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="TVL" />
        ),
        cell: ({ row }) => {
            const amount = parseFloat(row.getValue("TVL"))
            const displayValue = isNaN(amount) ? '-' : Math.round(amount).toLocaleString();
            return (
                <div className="max-w-[500px] truncate font-medium">
                    ${displayValue}
                </div>
            )
        },
    },
    {
        accessorKey: "CATEGORY",
        header: ({ column }) => (
            <DataTableColumnHeader column={column} title="Category" />
        ),
        cell: ({ row }) => {
            const status = categories.find(
                (status) => status.value === row.getValue("CATEGORY")
            )

            if (!status) {
                return null
            }

            return (
                <div className="flex w-[100px] items-center">
                    {status.icon && (
                        <status.icon className="mr-2 h-4 w-4 text-muted-foreground" />
                    )}
                    <span>{status.label}</span>
                </div>
            )
        },
        filterFn: (row, id, value) => {
            return value.includes(row.getValue(id))
        },
    },
]

export type BD = {
    PROJECT: string
    ETH_FEES: number
    ETH_FEES_GROWTH: number
    TRANSACTIONS: number
    TRANSACTIONS_GROWTH: number
    WALLETS: number
    WALLETS_GROWTH: number
    TVL: number
}

export const bdcolumns: ColumnDef<BD>[] = [
    {
        accessorKey: "PROJECT",
        header: "Project",
    },
    {
        accessorKey: "ETH_FEES",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Gas Fees (ETH)
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => {
            const amount = parseFloat(row.getValue("ETH_FEES"))

            return <div className="text-center font-medium">{amount.toFixed(2)}</div>
        },
    },
    {
        accessorKey: "ETH_FEES_GROWTH",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Gas Fees Growth
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => {
            const amount = parseFloat(row.getValue("ETH_FEES_GROWTH"))

            return <div className="text-center font-medium">{amount.toFixed(2)}%</div>
        },
    },
    {
        accessorKey: "TRANSACTIONS",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Transactions
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => {
            const amount = parseFloat(row.getValue("TRANSACTIONS"))

            return <div className="text-center font-medium">{amount}</div>
        },
    },
    {
        accessorKey: "TRANSACTIONS_GROWTH",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Transactions Growth
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => {
            const amount = parseFloat(row.getValue("TRANSACTIONS_GROWTH"))

            return <div className="text-center font-medium">{amount.toFixed(2)}%</div>
        },
    },
    {
        accessorKey: "WALLETS",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Active Wallets
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => {
            const amount = parseFloat(row.getValue("WALLETS"))

            return <div className="text-center font-medium">{amount}</div>
        },
    },
    {
        accessorKey: "WALLETS_GROWTH",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Wallets Growth
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => {
            const amount = parseFloat(row.getValue("WALLETS_GROWTH"))

            return <div className="text-center font-medium">{amount.toFixed(2)}%</div>
        },
    },
    {
        accessorKey: "TVL",
        header: ({ column }) => {
            return (
                <Button variant="ghost">
                    TVL
                </Button>
            )
        },
        cell: ({ row }) => {
            const tvl: number = row.getValue("TVL");
            const formattedTVL = !isNaN(tvl) ? numeral(tvl).format('$0,0.0a') : '-';

            return <div className="text-center font-medium">{formattedTVL}</div>
        },
    },
]

export type TrendingContracts = {
    CONTRACT: string
    PROJECT: string
    GAS_SPEND_CURRENT: number
    GAS_GROWTH: number
    TXNS_CURRENT: number
    TXN_GROWTH: number
    ACTIVE_ACCOUNTS_CURRENT: number
    ACCOUNTS_GROWTH: number
}

export const trendingcontractscolumns: ColumnDef<TrendingContracts>[] = [
    {
        accessorKey: "CONTRACT",
        header: "Contract",
    },
    {
        accessorKey: "PROJECT",
        header: ({ column }) => {
            return (
                <p>Project</p>
            )
        },
        cell: ({ row }) => {
            return <div className="text-center font-medium">{row.getValue("PROJECT")}</div>
        },
    },
    {
        accessorKey: "GAS_SPEND_CURRENT",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Gas Spend (ETH)
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => {
            const amount = parseFloat(row.getValue("GAS_SPEND_CURRENT"))

            return <div className="text-center font-medium">{amount.toFixed(2)}</div>
        },
    },
    {
        accessorKey: "GAS_GROWTH",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Gas Spend Growth
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => {
            const amount = parseFloat(row.getValue("GAS_GROWTH"))

            return <div className="text-center font-medium">{amount.toFixed(2)}%</div>
        },
    },
    {
        accessorKey: "TXNS_CURRENT",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Transactions
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => {
            const amount = parseFloat(row.getValue("TXNS_CURRENT"))

            return <div className="text-center font-medium">{amount.toLocaleString()}</div>
        },
    },
    {
        accessorKey: "TXN_GROWTH",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Transaction Growth
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => {
            const amount = parseFloat(row.getValue("TXN_GROWTH"))

            return <div className="text-center font-medium">{amount.toFixed(2)}%</div>
        },
    },
    {
        accessorKey: "ACTIVE_ACCOUNTS_CURRENT",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Active Wallets
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => {
            const amount = parseFloat(row.getValue("ACTIVE_ACCOUNTS_CURRENT"))

            return <div className="text-center font-medium">{amount.toLocaleString()}</div>
        },
    },
    {
        accessorKey: "ACCOUNTS_GROWTH",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Wallet Growth
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => {
            const amount = parseFloat(row.getValue("ACCOUNTS_GROWTH"))

            return <div className="text-center font-medium">{amount.toFixed(2)}%</div>
        },
    },
]
