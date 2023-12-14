interface BDData {
    leaderboard: any[],
}


export async function getBDData(): Promise<BDData> {
    const response = await fetch(`https://scrollstats-api.onrender.com/bd`, { next: { revalidate: 600 } });
    if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status} ${response.statusText}`);
    }

    const bdData: BDData = await response.json();

    return bdData;
}