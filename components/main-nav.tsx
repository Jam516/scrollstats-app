"use client"

import Link from "next/link";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation"
import {
    ScrollText
} from "lucide-react"

export function MainNav() {
    return (
        <nav className="flex items-center space-x-4 lg:space-x-6" >
            <Link href="/" className="flex items-center">
                <ScrollText className="mr-2 h-8 w-8" />
                <h1 className="text-2xl font-bold tracking-tight">ScrollStats</h1>
            </Link>
        </nav>
    );
}
