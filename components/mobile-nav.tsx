"use client"
import {
    ScrollText,
    Code,
    LayoutPanelLeft,
    Menu,
    Users,
    CircleDollarSign
} from "lucide-react"
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation"
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
            <div className="px-16">
                <DropdownMenu >
                    <DropdownMenuTrigger asChild>
                        <Menu className="mr-2 h-8 w-8" />
                    </DropdownMenuTrigger>

                    <DropdownMenuContent className="w-56">

                        <DropdownMenuItem>
                            <Users className="mr-2 h-4 w-4" />
                            <Link
                                href="/users/week"
                                className={cn(
                                    segments === "users" ? "text-foreground" : "text-foreground/60"
                                )}
                            >
                                Users
                            </Link>
                        </DropdownMenuItem>
                        {/* <DropdownMenuItem>
                            <LayoutPanelLeft className="mr-2 h-4 w-4" />
                            <Link
                                href="/apps/week"
                                className={cn(
                                    segments === "apps" ? "text-foreground" : "text-foreground/60"
                                )}
                            >
                                Apps
                            </Link>
                        </DropdownMenuItem> */}
                        <DropdownMenuItem>
                            <Code className="mr-2 h-4 w-4" />
                            <Link
                                href="/devs/week"
                                className={cn(
                                    segments === "devs" ? "text-foreground" : "text-foreground/60"
                                )}
                            >
                                Developers
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <CircleDollarSign className="mr-2 h-4 w-4" />
                            <Link
                                href="/economics/week"
                                className={cn(
                                    segments === "economics" ? "text-foreground" : "text-foreground/60"
                                )}
                            >
                                Economics
                            </Link>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </div>
    )
}
