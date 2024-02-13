import { getUserData } from "@/app/actions/getUserData"
import { Metadata } from "next";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { ChevronUp, ChevronsUp, ChevronDown, ChevronsDown } from 'lucide-react';
import { StatCard } from "@/components/stat-card";
import StackedBarChart from "@/components/stacked-contracts-chart";
import dynamic from 'next/dynamic';
import { RetentionTable } from "@/components/retention-table";
import { TimeSelect } from "@/components/time-select";
import MSBarChart from "@/components/marketshare-contracts-chart";
import { trendingcontractscolumns } from "@/components/columns"
import { DataTable } from "@/components/data-table"

export const metadata: Metadata = {
    title: "ScrollStats - Users",
    description: "A dashboard tracking the activity of Scroll users.",
};

const LChart = dynamic(() => import('@/components/line-chart'), { ssr: false });

function AboutBlock() {
    return (
        <div className="flex flex-col items-left space-y-2 pt-6">
            <h2 className="text-3xl font-bold tracking-tight">What is Scroll?</h2>
            <p>Scroll is a zkEVM Layer 2.</p>
            <h2 className="text-3xl font-bold tracking-tight">What is ScrollStats?</h2>
            <p>ScrollStats was created to provide transparent and verifiable insights into the adoption of Scroll.</p>
        </div>
    )
}

export const maxDuration = 60;

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

    const data = await getUserData({ timeframe });

    interface GrowthIconProps {
        growthValue: number;
    }

    function GrowthIcon({ growthValue }: GrowthIconProps) {
        if (growthValue > 50) {
            return <ChevronsUp className="pl-1" />;
        } else if (growthValue > 0) {
            return <ChevronUp className="pl-1" />;
        } else if (growthValue < 0) {
            return <ChevronDown className="pl-1" />;
        } else {
            return <ChevronsDown className="pl-1" />;
        }
    }

    function capitalizeFirstLetter(string: string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }


    return (
        <>
            <div className="flex flex-col">
                <div className="flex-1 space-y-4 p-8 pt-6">
                    {/* <div className="flex items-center justify-between space-y-2">
                        <h2 className="text-3xl font-bold tracking-tight">Users</h2>
                    </div> */}
                    {/* Unified grid for all cards */}
                    <div className="grid gap-4 grid-cols-2 md:grid-cols-3">
                        {/* First and Fourth cards (24h stats) */}
                        <StatCard
                            title="24h Active Wallets"
                            className="border-black shadow bg-card-bg md:order-1"
                            content={data.actives_24h[0].ACTIVE_WALLETS.toLocaleString()}
                        // subheader=" "
                        />
                        <StatCard
                            title="24h Active Wallet Growth"
                            className="border-black shadow bg-card-bg md:order-4"
                            content={
                                <>
                                    <div className="flex flex-row items-center">
                                        {`${data.actives_growth_24h[0].DAILY_GROWTH.toLocaleString()}%`}
                                        <GrowthIcon growthValue={data.actives_growth_24h[0].DAILY_GROWTH} />
                                    </div>
                                </>
                            }
                        // subheader="Growth"
                        />

                        {/* Second and Fifth cards (7d stats) - order adjusted for md screens */}
                        <StatCard
                            title="7d Active Wallets"
                            className="border-black shadow bg-card-bg md:order-2"
                            content={data.actives_7d[0].ACTIVE_WALLETS.toLocaleString()}
                        // subheader="Wallets"
                        />
                        <StatCard
                            title="7d Active Wallet Growth"
                            className="border-black shadow bg-card-bg md:order-5"
                            content={
                                <>
                                    <div className="flex flex-row items-center">
                                        {`${data.actives_growth_7d[0].WEEKLY_GROWTH.toLocaleString()}%`}
                                        <GrowthIcon growthValue={data.actives_growth_7d[0].WEEKLY_GROWTH} />
                                    </div>
                                </>
                            }
                        // subheader="Wallets"
                        />
                        {/* rounded-none */}
                        {/* Third and Sixth cards (1m stats) - order adjusted for md screens */}
                        <StatCard
                            title="1m Active Wallets"
                            className="border-black shadow bg-card-bg md:order-3"
                            content={data.actives_1m[0].ACTIVE_WALLETS.toLocaleString()}
                        // subheader="Wallets"
                        />
                        <StatCard
                            title="1m Active Wallet Growth"
                            className="border-black shadow bg-card-bg md:order-6"
                            content={
                                <>
                                    <div className="flex flex-row items-center">
                                        {`${data.actives_growth_1m[0].MONTHLY_GROWTH.toLocaleString()}%`}
                                        <GrowthIcon growthValue={data.actives_growth_1m[0].MONTHLY_GROWTH} />
                                    </div>
                                </>
                            }
                        // subheader="Wallets"
                        />
                    </div>
                    <div className="flex justify-between">
                        <TimeSelect />
                        <p className="hidden md:inline text-green-500">LAST UPDATED: {data.time}</p>
                    </div>
                    <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
                        <Card className="border-black shadow-custom shadow bg-card-bg">
                            <CardHeader>
                                <CardTitle>{titleparam + " Active Wallets"}</CardTitle>
                            </CardHeader>
                            <CardContent className="pl-0">
                                <LChart data={data.active_accounts_chart} />
                            </CardContent>
                        </Card>
                        <Card className="border-black shadow-custom shadow bg-card-bg">
                            <CardHeader>
                                <CardTitle>{titleparam + " Transactions"}</CardTitle>
                            </CardHeader>
                            <CardContent className="pl-0">
                                <LChart data={data.transactions_chart} />
                            </CardContent>
                        </Card>
                    </div>
                    <div >
                        <Card className="border-black shadow-custom shadow bg-card-bg">
                            <CardHeader>
                                <CardTitle>{"Share of " + titleparam + " App Transactions by Project"}</CardTitle>
                            </CardHeader>
                            <CardContent className="pl-2">
                                <MSBarChart data={data.contract_transactions_chart} />
                                <p>* Excluding potential spam contracts</p>
                            </CardContent>
                        </Card>
                    </div>
                    <div>
                        <Card className="border-black shadow-custom shadow bg-card-bg">
                            <CardHeader>
                                <CardTitle>{"Share of " + titleparam + " App Gas Fees by Project"}</CardTitle>
                            </CardHeader>
                            <CardContent className="pl-2">
                                <MSBarChart data={data.contract_gas_chart} />
                                <p>* Excluding potential spam contracts</p>
                            </CardContent>
                        </Card>
                    </div>
                    <div >
                        <Card className="border-black shadow-custom shadow bg-card-bg">
                            <CardHeader>
                                <CardTitle>{titleparam + " Wallet Retention"}</CardTitle>
                            </CardHeader>
                            <CardContent className="pl-2">
                                <div style={{ overflowX: 'auto', width: '100%' }}>
                                    <RetentionTable data={data.retention_chart} timeframe={timeframe} />
                                </div>
                                <p>* Measures the percentage of wallets in the cohort that were active X {timeframe}s after their first transaction</p>
                            </CardContent>
                        </Card>
                    </div>
                    <div >
                        <Card className="border-black shadow-custom shadow bg-card-bg">
                            <CardHeader>
                                <CardTitle>{"Past " + capitalizeFirstLetter(timeframe) + " Trending Contracts"}</CardTitle>
                            </CardHeader>
                            <CardContent className="pl-2">
                                <div style={{ overflowX: 'auto', width: '100%' }}>
                                    <DataTable columns={trendingcontractscolumns} data={data.trending_contracts} entity={true} />
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>

            </div>
        </>
    );
};