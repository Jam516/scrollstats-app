import { MainNav } from "@/components/main-nav";
import { MobileNav } from "@/components/mobile-nav";

export function SiteHeader() {
    return (
        <div className="border-b border-black bg-card-bg">
            <div className="hidden md:flex h-16 items-center px-4">
                <MainNav />
            </div>
            <div className="flex md:hidden h-16 items-center px-4">
                <MobileNav />
            </div>
        </div>
    );
}