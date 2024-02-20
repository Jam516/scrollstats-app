import { unstable_noStore as noStore } from "next/cache";

interface BDData {
    leaderboard: any[],
}

interface BDDataParams {
    timeframe: string;
}

export async function getBDData({ timeframe }: BDDataParams): Promise<BDData> {
    noStore();
    const response = await fetch(`https://scrollstats-api.onrender.com/bd?timeframe=${timeframe}`);
    if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status} ${response.statusText}`);
    }

    const bdData: BDData = await response.json();

    return bdData;
}