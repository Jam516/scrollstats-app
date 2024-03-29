import { unstable_noStore as noStore } from "next/cache";

interface UserDataParams {
    timeframe: string;
}

interface UserData {
    time: string,
    actives_24h: { ACTIVE_WALLETS: number }[],
    actives_growth_24h: { DAILY_GROWTH: number }[],
    actives_7d: { ACTIVE_WALLETS: number }[],
    actives_growth_7d: { WEEKLY_GROWTH: number }[],
    actives_1m: { ACTIVE_WALLETS: number }[],
    actives_growth_1m: { MONTHLY_GROWTH: number }[],
    active_accounts_chart: any[],
    transactions_chart: any[],
    retention_chart: any[],
    contract_users_chart: any[],
    contract_transactions_chart: any[],
    contract_gas_chart: any[],
    trending_contracts: any[],
}

export async function getUserData({ timeframe }: UserDataParams): Promise<UserData> {
    noStore();
    const response = await fetch(`https://scrollstats-api.onrender.com/users?timeframe=${timeframe}`);
    if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status} ${response.statusText}`);
    }

    const userData: UserData = await response.json();

    return userData;
}