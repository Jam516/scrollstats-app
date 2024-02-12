interface DeployerDataParams {
    timeframe: string;
}

interface DeployerData {
    all_deployers: any[],
    returning_key_deployers: any[],
    chain_key_deployers: any[],
    key_deployers: any[],
}

export async function getDeployerData({ timeframe }: DeployerDataParams): Promise<DeployerData> {
    const response = await fetch(`https://scrollstats-api.onrender.com/deployers?timeframe=${timeframe}`);
    if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status} ${response.statusText}`);
    }

    const deployerData: DeployerData = await response.json();

    return deployerData;
}