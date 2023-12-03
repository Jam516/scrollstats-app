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
// import LChart from "@/components/line-chart";
import dynamic from 'next/dynamic';

export const metadata: Metadata = {
    title: "ScrollStats",
    description: "A dashboard tracking the activity of Scroll users.",
};

const LChart = dynamic(() => import('@/components/line-chart'), { ssr: false });

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

                        {/* Third and Sixth cards (1m stats) - order adjusted for md screens */}
                        <StatCard
                            title="1m Active Wallets"
                            className="border-black rounded-none bg-card-bg md:order-3"
                            content={data.actives_1m[0].ACTIVE_WALLETS.toLocaleString()}
                        // subheader="Wallets"
                        />
                        <StatCard
                            title="1m Active Wallet Growth"
                            className="border-black rounded-none bg-card-bg md:order-6"
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
                    <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
                        <Card className="border-black shadow-custom shadow bg-card-bg">
                            <CardHeader>
                                <CardTitle>{titleparam + " Active Smart Wallets"}</CardTitle>
                            </CardHeader>
                            <CardContent className="pl-2">
                                <LChart data={data.active_accounts_chart} />
                            </CardContent>
                        </Card>
                        <Card className="border-black shadow-custom shadow bg-card-bg">
                            <CardHeader>
                                <CardTitle>{titleparam + " Transactions"}</CardTitle>
                            </CardHeader>
                            <CardContent className="pl-2">
                                <LChart data={data.transactions_chart} />
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </>
    );
};