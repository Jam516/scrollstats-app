import Link from "next/link";
import {
    FileText
} from "lucide-react"

export function SiteHeader() {
    return (
        <div className="border-b">
            <div className="hidden md:flex h-16 items-center px-4">
                <Link href="/" className="flex items-center">
                    <FileText className="mr-2 h-8 w-8" />
                    <h1>ScrollStats</h1>
                </Link>
            </div>
        </div>
    );
}