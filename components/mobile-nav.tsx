"use client"
import {
    ScrollText
} from "lucide-react"
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from "next/link";

export function MobileNav() {

    const pathname = usePathname();
    const segments = pathname.split("/")[1];

    return (
        <div className="flex w-full justify-between ">
            <Link href="/" className="flex items-center">
                <ScrollText className="mr-2 h-8 w-8" />
                <h1 className="text-2xl font-bold tracking-tight">ScrollStats</h1>
            </Link>
        </div>
    )
}
