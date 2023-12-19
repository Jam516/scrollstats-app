"use client"

import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"

export type BD = {
    PROJECT: string
    NUM_UNIQUE_SENDERS: number
    NUM_OPS: number
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
