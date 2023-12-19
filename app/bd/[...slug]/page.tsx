import { getBDData } from "@/app/actions/getBDData"
import { Metadata } from "next";
import { bdcolumns } from "@/components/columns"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { DataTable } from "@/components/data-table"
import { TimeSelect } from "@/components/time-select";

export default async function BDPage({ params }: { params: { slug: string[] } }) {

    let timeframe = params.slug[0];
    if (timeframe === undefined) {
        timeframe = "month"
    };

    const data = await getBDData({ timeframe });

    function capitalizeFirstLetter(string: string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    return (
        <>
            <div className="flex flex-col">
                <div className="flex-1 space-y-4 p-8 pt-6">
                    <TimeSelect />
                    <div >
                        <Card className="border-black shadow-custom shadow bg-card-bg">
                            <CardHeader>
                                <CardTitle>{"Past " + capitalizeFirstLetter(timeframe) + " Project Usage Summary"}</CardTitle>
                            </CardHeader>
                            <CardContent className="pl-2">
                                <div style={{ overflowX: 'auto', width: '100%' }}>
                                    <DataTable columns={bdcolumns} data={data.leaderboard} entity={false} />
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </>
    );
};
