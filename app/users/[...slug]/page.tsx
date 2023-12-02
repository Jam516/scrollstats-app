import { getUserData } from "@/app/actions/getUserData"
import { Metadata } from "next";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { StatCard } from "@/components/stat-card";

export const metadata: Metadata = {
    title: "ScrollStats",
    description: "A dashboard tracking the activity of Scroll users.",
};

export default async function UsersPage({ params }: { params: { slug: string[] } }) {

    let timeframe = params.slug[0];
    if (timeframe === undefined) {
        timeframe = "week"
    };

    const data = await getUserData({ timeframe });

    return (
        <>
            <div className="flex flex-col">
                <div className="flex-1 space-y-4 p-8 pt-6">
                    <div className="flex items-center justify-between space-y-2">
                        <h2 className="text-3xl font-bold tracking-tight">Users</h2>
                    </div>
                    {/* Unified grid for all cards */}
                    <div className="grid gap-4 grid-cols-2 md:grid-cols-3">
                        {/* First and Fourth cards (24h stats) */}
                        <StatCard
                            title="24h Active Wallets"
                            className="border-black"
                            content={data.actives_24h[0].ACTIVE_WALLETS.toLocaleString()}
                            subheader="Wallets"
                            icon={
                                <><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" /></>
                            } />
                        <StatCard
                            title="24h Active Wallet Growth"
                            className="border-black"
                            content={data.actives_24h[0].ACTIVE_WALLETS.toLocaleString()}
                            subheader="Wallets"
                            icon={
                                <><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" /></>
                            } />

                        {/* Second and Fifth cards (7d stats) - order adjusted for md screens */}
                        <StatCard
                            title="7d Active Wallets"
                            className="md:order-3"
                            content={data.actives_7d[0].ACTIVE_WALLETS.toLocaleString()}
                            subheader="Wallets"
                            icon={
                                <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                            } />
                        <StatCard
                            title="7d Active Wallet Growth"
                            className="md:order-6"
                            content={data.actives_7d[0].ACTIVE_WALLETS.toLocaleString()}
                            subheader="Wallets"
                            icon={
                                <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                            } />

                        {/* Third and Sixth cards (1m stats) - order adjusted for md screens */}
                        <StatCard
                            title="1m Active Wallets"
                            className="md:order-4"
                            content={data.actives_7d[0].ACTIVE_WALLETS.toLocaleString()}
                            subheader="Wallets"
                            icon={
                                <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                            } />
                        <StatCard
                            title="1m Active Wallet Growth"
                            className="md:order-5"
                            content={data.actives_7d[0].ACTIVE_WALLETS.toLocaleString()}
                            subheader="Wallets"
                            icon={
                                <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                            } />
                    </div>
                    {/* <div className="grid gap-4 grid-cols-2 md:grid-cols-3">
                        <StatCard
                            title="24h Active Wallets"
                            content={data.actives_24h[0].ACTIVE_WALLETS.toLocaleString()}
                            subheader="Wallets"
                            icon={
                                <><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" /></>
                            } />

                        <StatCard
                            title="7d Active Wallets"
                            content={data.actives_7d[0].ACTIVE_WALLETS.toLocaleString()}
                            subheader="Wallets"
                            icon={
                                <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                            } />

                        <StatCard
                            title="1m Active Wallets"
                            content={data.actives_7d[0].ACTIVE_WALLETS.toLocaleString()}
                            subheader="Wallets"
                            icon={
                                <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                            } />
                    </div>
                    <div className="grid gap-4 grid-cols-2 md:grid-cols-3">
                        <StatCard
                            title="24h Active Wallet Growth"
                            content={data.actives_24h[0].ACTIVE_WALLETS.toLocaleString()}
                            subheader="Wallets"
                            icon={
                                <><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" /></>
                            } />

                        <StatCard
                            title="7d Active Wallet Growth"
                            content={data.actives_7d[0].ACTIVE_WALLETS.toLocaleString()}
                            subheader="Wallets"
                            icon={
                                <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                            } />

                        <StatCard
                            title="1m Active Wallet Growth"
                            content={data.actives_7d[0].ACTIVE_WALLETS.toLocaleString()}
                            subheader="Wallets"
                            icon={
                                <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                            } />
                    </div> */}
                </div>
            </div>
        </>
    );
};