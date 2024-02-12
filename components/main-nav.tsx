"use client"

import Link from "next/link";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation"
import {
    ScrollText
} from "lucide-react"
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"

export function MainNav() {
    const pathname = usePathname();
    const segments = pathname.split("/")[1];

    return (
        <nav className="flex items-center space-x-4 lg:space-x-6" >
            <Link href="/" className="flex items-center">
                <ScrollText className="mr-2 h-8 w-8" />
                <h1 className="text-2xl font-bold tracking-tight">ScrollStats</h1>
            </Link>
            <Link
                href="/users/week"
                className={cn(
                    "text-sm font-medium transition-colors hover:text-foreground/80 hover:text-primary",
                    segments === "users" ? "text-foreground" : "text-foreground/60"
                )}
            >
                Users
            </Link>
            <Link
                href="/apps/week"
                className={cn(
                    "text-sm font-medium transition-colors hover:text-foreground/80 hover:text-primary",
                    segments === "apps" ? "text-foreground" : "text-foreground/60"
                )}
            >
                Apps
            </Link>
            <Link
                href="/devs/week"
                className={cn(
                    "text-sm font-medium transition-colors hover:text-foreground/80 hover:text-primary",
                    segments === "devs" ? "text-foreground" : "text-foreground/60"
                )}
            >
                Developers
            </Link>
            <Link
                href="/economics/week"
                className={cn(
                    "text-sm font-medium transition-colors hover:text-foreground/80 hover:text-primary",
                    segments === "economics" ? "text-foreground" : "text-foreground/60"
                )}
            >
                Economics
            </Link>
        </nav>
    );
}
