import { unstable_noStore as noStore } from "next/cache";

interface AccountingDataParams {
    start: string;
    end: string;
}

interface AccountingData {
    report: any[],
}

export async function getAccountingData({ start, end }: AccountingDataParams): Promise<AccountingData> {
    noStore();
    const response = await fetch(`https://scrollstats-api.onrender.com/econ_report?start=${start}&end=${end}`);
    if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status} ${response.statusText}`);
    }

    const accountingData: AccountingData = await response.json();

    return accountingData;
}