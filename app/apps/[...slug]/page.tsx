import { Metadata } from "next";
import { getBDData } from "@/app/actions/getBDData";
import { z } from "zod";

import { TimeSelect } from "@/components/time-select2";
import { columns } from "@/components/columns";
import { DataTable } from "@/components/data-table-advanced";
import { appSchema } from "@/components/schema"

export const maxDuration = 60;

export const metadata: Metadata = {
    title: "ScrollStats - Apps",
    description: "A dashboard tracking applications on Scroll.",
};

export default async function AppsPage({ params }: { params: { slug: string[] } }) {

    let timeframe = params.slug[0];
    if (timeframe === undefined) {
        timeframe = "month"
    };

    function capitalizeFirstLetter(string: string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    const data = await getBDData({ timeframe });
    const apps = z.array(appSchema).parse(data.leaderboard)

    return (
        <>
            <div className="flex flex-col">
                <div className="flex-1 space-y-4 p-8 pt-3">
                    <div className="hidden h-full flex-1 flex-col space-y-2 p-2 md:flex">
                        <div className="flex items-center justify-between space-y-2">
                            <div>
                                <h2 className="text-2xl font-bold tracking-tight">{"Past " + capitalizeFirstLetter(timeframe) + " Project Usage Summary"}</h2>
                                <p className="text-muted-foreground">
                                    A database of Scroll Apps
                                </p>
                            </div>
                        </div>
                        <DataTable data={apps} columns={columns} />
                    </div>
                </div>
            </div>
        </>
    );
};