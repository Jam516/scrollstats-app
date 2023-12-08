import { MainNav } from "@/components/main-nav";
import { MobileNav } from "@/components/mobile-nav";
import { TimeSelect } from "@/components/time-select";

export function SiteHeader() {
    return (
        <div className="border-b border-black bg-card-bg">
            <div className="hidden md:flex h-16 items-center px-4 justify-between">
                <MainNav />
                {/* <div className="pl-6"> */}
                <TimeSelect />
                {/* </div> */}
            </div>
            <div className="flex md:hidden h-16 items-center px-4">
                <MobileNav />
            </div>
        </div>
    );
}