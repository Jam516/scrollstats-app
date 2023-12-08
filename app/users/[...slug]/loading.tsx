import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {

    return (
        <>
            <div className="hidden flex-col md:flex">
                <div className="flex-1 space-y-4 p-8 pt-6">
                    <div className="grid gap-4 grid-cols-2 md:grid-cols-3">
                        <Skeleton className="h-[106px]" />
                        <Skeleton className="h-[106px]" />
                        <Skeleton className="h-[106px]" />
                        <Skeleton className="h-[106px]" />
                        <Skeleton className="h-[106px]" />
                        <Skeleton className="h-[106px]" />
                    </div>
                    <div className="grid gap-4 grid-cols-2 ">
                        <Skeleton className="h-[397px] col-span-1" />
                        <Skeleton className="h-[397px] col-span-1" />
                        <Skeleton className="h-[518px] col-span-2" />
                        <Skeleton className="h-[518px] col-span-2" />
                    </div>
                </div>
            </div>
        </>

    );
}