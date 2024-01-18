import { Metadata } from "next";
import { getDeployerData } from "@/app/actions/getDeployerData"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { TimeSelect } from "@/components/time-select";
import LChart from "@/components/line-chart-econ"
import { LineChainChart } from "@/components/line-chain";
import StackedReturningChart from "@/components/stacked-returning-chart"

export const metadata: Metadata = {
    title: "ScrollStats - Developers",
    description: "A dashboard tracking developers on Scroll.",
};

export default async function DeveloperPage({ params }: { params: { slug: string[] } }) {

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

    const data = await getDeployerData({ timeframe });

    function capitalizeFirstLetter(string: string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    return (
        <>
            <div className="flex flex-col">
                <div className="flex-1 space-y-4 p-8 pt-6">
                    <div className="flex justify-between">
                        <TimeSelect />
                    </div>
                    <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
                        <Card className="border-black shadow-custom shadow bg-card-bg">
                            <CardHeader>
                                <CardTitle>{titleparam + " Key Deployers ✨"}</CardTitle>
                                <CardDescription>Contract deployers filtered for high quality</CardDescription>
                            </CardHeader>
                            <CardContent className="pl-0">
                                <LChart data={data.key_deployers} yaxis={'FILTERED_DEPLOYERS'} usd={false} fill={"#fac748"} />
                            </CardContent>
                        </Card>
                        <Card className="border-black shadow-custom shadow bg-card-bg">
                            <CardHeader>
                                <CardTitle>{titleparam + " Total Deployers"}</CardTitle>
                                <CardDescription>All wallets that have deployed contracts</CardDescription>
                            </CardHeader>
                            <CardContent className="pl-0">
                                <LChart data={data.all_deployers} yaxis={'ALL_DEPLOYERS'} usd={false} fill={"#3454D1"} />
                            </CardContent>
                        </Card>
                    </div>
                    <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
                        <Card className="border-black shadow-custom shadow bg-card-bg">
                            <CardHeader>
                                <CardTitle>{titleparam + " New vs Returning Key Deployers"}</CardTitle>
                            </CardHeader>
                            <CardContent className="pl-0">
                                <StackedReturningChart data={data.returning_key_deployers} />
                            </CardContent>
                        </Card>
                        <Card className="border-black shadow-custom shadow bg-card-bg">
                            <CardHeader>
                                <CardTitle>{titleparam + " Crosschain Key Deployers"}</CardTitle>
                            </CardHeader>
                            <CardContent className="pl-0">
                                <LineChainChart data={data.chain_key_deployers} usd={false} />
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </>
    );
};