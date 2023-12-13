import React from 'react';
import moment from 'moment';

type CohortData = {
    COHORT: string;
    MONTH_NUMBER?: number;
    WEEK_NUMBER?: number;
    DAY_NUMBER?: number;
    PERCENTAGE: string;
    TOTAL_USERS: number;
};

type RetentionTableProps = {
    data: CohortData[];
    timeframe: string;
};

const formatDate = (date: string) => {
    return moment(date, 'YY-MM-DD').format('DD-MMM');
};

export const RetentionTable: React.FC<RetentionTableProps> = ({ data, timeframe }) => {

    const organizeData = (data: CohortData[]): Record<string, { percentages: Record<number, string>, totalUsers: number }> => {
        const organizedData: Record<string, { percentages: Record<number, string>, totalUsers: number }> = {};

        data.forEach(entry => {
            const numberKey = timeframe === 'month' ? 'MONTH_NUMBER' : (timeframe === 'week' ? 'WEEK_NUMBER' : 'DAY_NUMBER');
            const numberValue = entry[numberKey as keyof CohortData] as number | undefined;

            if (numberValue === undefined) return;

            if (!organizedData[entry.COHORT]) {
                organizedData[entry.COHORT] = { percentages: {}, totalUsers: entry.TOTAL_USERS };
            }
            organizedData[entry.COHORT].percentages[numberValue] = entry.PERCENTAGE;
        });

        return organizedData;
    }

    const organizedData = organizeData(data);
    const cohorts = Object.keys(organizedData);
    const maxMonthNumber = Math.max(...data.map(d => d.MONTH_NUMBER ?? d.WEEK_NUMBER ?? d.DAY_NUMBER ?? 0));

    return (
        <table className="w-full border-collapse">
            <thead>
                <tr>
                    <th className="border border-black p-2" style={{ backgroundColor: '#FFDEB5' }}>Cohort</th>
                    <th className="border border-black p-2" style={{ backgroundColor: '#FFDEB5' }}>Wallets</th>
                    {Array.from({ length: maxMonthNumber + 1 }).map((_, idx) => (
                        <th key={idx} className="border border-black p-2" style={{ backgroundColor: '#FFDEB5' }}>{timeframe} {idx}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {cohorts.map(cohort => (
                    <tr key={cohort}>
                        <td className="border border-black p-2">{formatDate(cohort)}</td>
                        <td className="border border-black p-2">{organizedData[cohort].totalUsers}</td>
                        {Array.from({ length: maxMonthNumber + 1 }).map((_, idx) => (
                            <td
                                key={idx}
                                className={`border border-black p-2`}
                            >
                                {organizedData[cohort].percentages[idx] ? organizedData[cohort].percentages[idx] + '%' : '-'}
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    );
};
