import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {

    function capitalizeFirstLetter(string: string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    return (
        <>
            <div className="flex flex-col">
                <div className="flex-1 space-y-4 p-8 pt-3">
                    <div className="hidden h-full flex-1 flex-col space-y-2 p-2 md:flex">
                        <div className="flex items-center justify-between space-y-2">
                            <div>
                                <h2 className="text-2xl font-bold tracking-tight">{"Past ___ Project Usage Summary"}</h2>
                                <p className="text-muted-foreground">
                                    A database of Scroll Apps
                                </p>
                            </div>
                        </div>
                        <div className="grid gap-4 grid-cols-1">
                            <Skeleton className="h-[600px]" />
                        </div>
                    </div>
                </div>
            </div>

        </>

    );
}