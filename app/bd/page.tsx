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

export default async function BDPage({ params }: { params: { slug: string[] } }) {

    const data = await getBDData();

    return (
        <>
            <div className="flex flex-col">
                <div className="flex-1 space-y-4 p-8 pt-6">
                    <div >
                        <Card className="border-black shadow-custom shadow bg-card-bg">
                            <CardHeader>
                                <CardTitle>30-Day Project Usage Summary</CardTitle>
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
