import { Metadata } from "next";
import { getDeployerData } from "@/app/actions/getDeployerData"
import { getDeveloperData } from "@/app/actions/getDeveloperData"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { TimeSelect } from "@/components/time-select";
import BarChartEcon from "@/components/bar-chart-econ";
import LineChartG from "@/components/line-chart-generalised";
import { LineChainChart } from "@/components/line-chain";
import StackedReturningChart from "@/components/stacked-returning-chart";

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

    const deploy_data = await getDeployerData({ timeframe });
    const git_data = await getDeveloperData({ timeframe });

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
                    <div className="flex items-center justify-between space-y-2">
                        <h2 className="text-3xl font-bold tracking-tight">I. Contract Deployers</h2>
                    </div>
                    <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
                        <Card className="border-black shadow-custom shadow bg-card-bg">
                            <CardHeader>
                                <CardTitle>{titleparam + " Key Deployers ✨"}</CardTitle>
                                <CardDescription>Contract deployers filtered for high quality. 3 {timeframe} MA</CardDescription>
                            </CardHeader>
                            <CardContent className="pl-0">
                                <BarChartEcon data={deploy_data.key_deployers} yaxis={'FILTERED_DEPLOYERS'} usd={false} fill={"#fac748"} />
                            </CardContent>
                        </Card>
                        <Card className="border-black shadow-custom shadow bg-card-bg">
                            <CardHeader>
                                <CardTitle>{titleparam + " Total Deployers"}</CardTitle>
                                <CardDescription>All wallets that have deployed contracts. 3 {timeframe} MA</CardDescription>
                            </CardHeader>
                            <CardContent className="pl-0">
                                <BarChartEcon data={deploy_data.all_deployers} yaxis={'ALL_DEPLOYERS'} usd={false} fill={"#3454D1"} />
                            </CardContent>
                        </Card>
                    </div>
                    <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
                        <Card className="border-black shadow-custom shadow bg-card-bg">
                            <CardHeader>
                                <CardTitle>{titleparam + " New vs Returning Key Deployers"}</CardTitle>
                            </CardHeader>
                            <CardContent className="pl-0">
                                <StackedReturningChart data={deploy_data.returning_key_deployers} />
                            </CardContent>
                        </Card>
                        <Card className="border-black shadow-custom shadow bg-card-bg">
                            <CardHeader>
                                <CardTitle>{titleparam + " Crosschain Key Deployers"}</CardTitle>
                                <CardDescription>3 {timeframe} Moving Average</CardDescription>
                            </CardHeader>
                            <CardContent className="pl-0">
                                <LineChainChart data={deploy_data.chain_key_deployers} usd={false} />
                            </CardContent>
                        </Card>
                    </div>
                    <div className="flex items-center justify-between space-y-2">
                        <h2 className="text-3xl font-bold tracking-tight">II. Github Activity</h2>
                    </div>
                    <div className="flex items-center justify-between space-y-2">
                        <h2 className="text-xl font-bold tracking-tight text-gray-500">Using Electric Capital&apos;s
                            <a
                                href="https://github.com/electric-capital/crypto-ecosystems"
                                target="_blank"
                                rel="noreferrer"
                                className="text-blue-500"
                            > crypto ecosystem labels</a></h2>
                    </div>
                    <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
                        <Card className="border-black shadow-custom shadow bg-card-bg">
                            <CardHeader>
                                <CardTitle>{titleparam + " Active Devs on GitHub"}</CardTitle>
                                <CardDescription>3 {timeframe} Moving Average</CardDescription>
                            </CardHeader>
                            <CardContent className="pl-0">
                                <LineChartG data={git_data.git_devs} yaxis={'ACTIVE_DEVS'} usd={false} fill={"#3454D1"} />

                            </CardContent>
                        </Card>
                        <Card className="border-black shadow-custom shadow bg-card-bg">
                            <CardHeader>
                                <CardTitle>{titleparam + " GitHub Commits"}</CardTitle>
                                <CardDescription>3 {timeframe} Moving Average</CardDescription>
                            </CardHeader>
                            <CardContent className="pl-0">
                                <LineChartG data={git_data.commits} yaxis={'COMMITS'} usd={false} fill={"#2a9d8f"} />

                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </>
    );
};