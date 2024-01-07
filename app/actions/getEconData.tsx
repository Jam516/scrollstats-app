interface EconDataParams {
    timeframe: string;
}

interface EconData {
    gross_profit: any[],
    gas_revenue: any[],
    batch_fees: any[],
    verify_fees: any[],
    week_gross_profit: { PROFIT: string }[],
    month_gross_profit: { PROFIT: string }[],
    all_gross_profit: { PROFIT: string }[],
    week_revenue: { GAS_REV: string }[],
    month_revenue: { GAS_REV: string }[],
    all_revenue: { GAS_REV: string }[],
    l1vl2fee: any[],
}

export async function getEconData({ timeframe }: EconDataParams): Promise<EconData> {
    const response = await fetch(`https://scrollstats-api.onrender.com/economics?timeframe=${timeframe}`, { next: { revalidate: 600 } });
    if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status} ${response.statusText}`);
    }

    const userData: EconData = await response.json();

    return userData;
}