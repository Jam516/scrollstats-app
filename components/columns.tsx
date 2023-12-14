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

            return <div className="text-center font-medium">{amount}</div>
        },
    },
    {
        accessorKey: "NUM_TRANSACTIONS",
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
            const amount = parseFloat(row.getValue("NUM_TRANSACTIONS"))

            return <div className="text-center font-medium">{amount}</div>
        },
    },
    {
        accessorKey: "NUM_WALLETS",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Wallets
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => {
            const amount = parseFloat(row.getValue("NUM_WALLETS"))

            return <div className="text-center font-medium">{amount}</div>
        },
    },
]
