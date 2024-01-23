interface DeveloperDataParams {
    timeframe: string;
}

interface DeveloperData {
    commits: any[],
    git_devs: any[],
}

export async function getDeveloperData({ timeframe }: DeveloperDataParams): Promise<DeveloperData> {
    const response = await fetch(`https://scrollstats-api.onrender.com/developers?timeframe=${timeframe}`, { next: { revalidate: 600 } });
    if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status} ${response.statusText}`);
    }

    const developerData: DeveloperData = await response.json();

    return developerData;
}