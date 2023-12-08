interface UserDataParams {
    timeframe: string;
}

interface UserData {
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
}

export async function getUserData({ timeframe }: UserDataParams): Promise<UserData> {
    const response = await fetch(`https://scrollstats-api.onrender.com/users?timeframe=${timeframe}`, { next: { revalidate: 600 } });
    if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status} ${response.statusText}`);
    }

    const userData: UserData = await response.json();
    // console.log(userData.transactions_chart)

    return userData;
}