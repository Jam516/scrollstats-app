import { getEconData } from "@/app/actions/getEconData"
import { Metadata } from "next";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { StatCard } from "@/components/stat-card";
import { TimeSelect } from "@/components/time-select";
import StackedFeeChart from "@/components/stacked-fee-chart";

import LChart from "@/components/line-chart-econ"

export default async function UsersPage({ params }: { params: { slug: string[] } }) {

    let timeframe = params.slug[0];
    if (timeframe === undefined) {
        timeframe = "week"
    };

    let titleparam: string = "Weekly";
    if (timeframe === 'week') {
        titleparam = 'Weekly';
    } else if (timeframe === 'day') {
        titleparam = 'Daily';
    } else if (timeframe === 'month') {
        titleparam = 'Monthly';
    }

    const data = await getEconData({ timeframe });

    function capitalizeFirstLetter(string: string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    // console.log(data.week_gross_profit)


    return (
        <>
            <div className="flex flex-col">
                <div className="flex-1 space-y-4 p-8 pt-6">
                    {/* <div className="flex items-center justify-between space-y-2">
                        <h2 className="text-3xl font-bold tracking-tight">Econ</h2>
                    </div> */}
                    <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
                        <StatCard
                            title="7d Gross Profit"
                            className="border-black shadow bg-card-bg md:order-1"
                            content={`${parseFloat(data.week_gross_profit[0].PROFIT).toFixed(2)} ETH`}

                        />
                        <StatCard
                            title="1m Gross Profit"
                            className="border-black shadow bg-card-bg md:order-1"
                            content={`${parseFloat(data.month_gross_profit[0].PROFIT).toFixed(2)} ETH`}
                        />
                        <StatCard
                            title="Total Gross Profit"
                            className="border-black shadow bg-card-bg md:order-1"
                            content={`${parseFloat(data.all_gross_profit[0].PROFIT).toFixed(2)} ETH`}
                        />
                    </div>
                    <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
                        <StatCard
                            title="7d Revenue"
                            className="border-black shadow bg-card-bg md:order-1"
                            content={`${parseFloat(data.week_revenue[0].GAS_REV).toFixed(2)} ETH`}

                        />
                        <StatCard
                            title="1m Revenue"
                            className="border-black shadow bg-card-bg md:order-1"
                            content={`${parseFloat(data.month_revenue[0].GAS_REV).toFixed(2)} ETH`}
                        />
                        <StatCard
                            title="Total Revenue"
                            className="border-black shadow bg-card-bg md:order-1"
                            content={`${parseFloat(data.all_revenue[0].GAS_REV).toFixed(2)} ETH`}
                        />
                    </div>
                    <div className="flex justify-between">
                        <TimeSelect />
                    </div>
                    <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
                        <Card className="border-black shadow-custom shadow bg-card-bg">
                            <CardHeader>
                                <CardTitle>{titleparam + " Gross Profit (ETH)"}</CardTitle>
                                <CardDescription>Gas Fee Revenue - Cost of Posting Batches to L1 - Cost of Finalizing Batches with Proof</CardDescription>
                            </CardHeader>
                            <CardContent className="pl-0">
                                <LChart data={data.gross_profit} yaxis={'PROFIT'} usd={false} fill={"#3454D1"} />
                            </CardContent>
                        </Card>
                        <Card className="border-black shadow-custom shadow bg-card-bg">
                            <CardHeader>
                                <CardTitle>{titleparam + " Gross Profit (USD)"}</CardTitle>
                                <CardDescription>Gas Fee Revenue - Cost of Posting Batches to L1 - Cost of Finalizing Batches with Proof</CardDescription>
                            </CardHeader>
                            <CardContent className="pl-0">
                                <LChart data={data.gross_profit} yaxis={'PROFIT_USD'} usd={true} fill={"#3454D1"} />
                            </CardContent>
                        </Card>
                    </div>
                    <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
                        <Card className="border-black shadow-custom shadow bg-card-bg">
                            <CardHeader>
                                <CardTitle>{titleparam + " Gas Fee Revenue (ETH)"}</CardTitle>
                            </CardHeader>
                            <CardContent className="pl-0">
                                <LChart data={data.gas_revenue} yaxis={'GAS_REV'} usd={false} fill={"#2A9D8F"} />
                            </CardContent>
                        </Card>
                        <Card className="border-black shadow-custom shadow bg-card-bg">
                            <CardHeader>
                                <CardTitle>{titleparam + " Gas Fee Revenue (USD)"}</CardTitle>
                            </CardHeader>
                            <CardContent className="pl-0">
                                <LChart data={data.gas_revenue} yaxis={'GAS_REV_USD'} usd={true} fill={"#2A9D8F"} />
                            </CardContent>
                        </Card>
                    </div>
                    <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
                        <Card className="border-black shadow-custom shadow bg-card-bg">
                            <CardHeader>
                                <CardTitle>{titleparam + " Cost of Posting Batches (ETH)"}</CardTitle>
                            </CardHeader>
                            <CardContent className="pl-0">
                                <LChart data={data.batch_fees} yaxis={'BATCH_FEES'} usd={false} fill={"#D1345B"} />
                            </CardContent>
                        </Card>
                        <Card className="border-black shadow-custom shadow bg-card-bg">
                            <CardHeader>
                                <CardTitle>{titleparam + " Cost of Posting Batches (USD)"}</CardTitle>
                            </CardHeader>
                            <CardContent className="pl-0">
                                <LChart data={data.batch_fees} yaxis={'BATCH_FEES_USD'} usd={true} fill={"#D1345B"} />
                            </CardContent>
                        </Card>
                    </div>
                    <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
                        <Card className="border-black shadow-custom shadow bg-card-bg">
                            <CardHeader>
                                <CardTitle>{titleparam + " Cost of Verifying Batches (ETH)"}</CardTitle>
                            </CardHeader>
                            <CardContent className="pl-0">
                                <LChart data={data.verify_fees} yaxis={'VERIFICATION_FEES'} usd={false} fill={"#D1345B"} />
                            </CardContent>
                        </Card>
                        <Card className="border-black shadow-custom shadow bg-card-bg">
                            <CardHeader>
                                <CardTitle>{titleparam + " Cost of Verifying Batches (USD)"}</CardTitle>
                            </CardHeader>
                            <CardContent className="pl-0">
                                <LChart data={data.verify_fees} yaxis={'VERIFICATION_FEES_USD'} usd={true} fill={"#D1345B"} />
                            </CardContent>
                        </Card>
                    </div>
                    <div >
                        <Card className="border-black shadow-custom shadow bg-card-bg">
                            <CardHeader>
                                <CardTitle>{"Share of " + titleparam + " Gas Spend from L1 Fee vs L2 Fee"}</CardTitle>
                            </CardHeader>
                            <CardContent className="pl-2">
                                <StackedFeeChart data={data.l1vl2fee} />
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </>
    );
};