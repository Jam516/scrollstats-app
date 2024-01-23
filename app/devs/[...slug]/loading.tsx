import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {

    return (
        <>
            <div className="hidden flex-col md:flex">
                <div className="flex-1 space-y-4 p-8 pt-6">
                    <div className="flex items-center justify-between space-y-2 pt-13">
                        <h2 className="text-3xl font-bold tracking-tight">I. Contract Deployers</h2>
                    </div>
                    <div className="grid gap-4 grid-cols-2 ">
                        <Skeleton className="h-[518px] border-black shadow-custom shadow bg-card-bg" />
                        <Skeleton className="h-[518px] border-black shadow-custom shadow bg-card-bg" />
                    </div>
                    <div className="grid gap-4 grid-cols-2 ">
                        <Skeleton className="h-[518px] border-black shadow-custom shadow bg-card-bg" />
                        <Skeleton className="h-[518px] border-black shadow-custom shadow bg-card-bg" />
                    </div>
                </div>
            </div>
        </>

    );
}