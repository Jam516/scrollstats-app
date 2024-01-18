"use client";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, Legend } from 'recharts';
import numeral from 'numeral';
import moment from 'moment';

interface DataProps {
    DATE: string;
    CLASSIFICATION: string;
    NUM_ACCOUNTS: number;
}

type StackedReturningChartProps = {
    data: DataProps[];
};

const StackedReturningChart: React.FC<StackedReturningChartProps> = ({ data }) => {

    const toPercent = (decimal: number) => `${(decimal * 100).toLocaleString()}%`;

    const getPercent = (value: number, total: number) => {
        const ratio = total > 0 ? value / total : 0;

        return toPercent(ratio);
    };

    const transformData = (data: DataProps[]): any[] => {
        const groupedData: { [key: string]: any } = {};

        data.forEach(item => {
            // Initialize the date object if it doesn't exist
            if (!groupedData[item.DATE]) {
                groupedData[item.DATE] = { DATE: item.DATE };
            }

            // Assign the value for each project
            groupedData[item.DATE][item.CLASSIFICATION] = item['NUM_ACCOUNTS'] || 0;
        });

        return Object.values(groupedData);
    };

    const transformedData = transformData(data);

    const axisLabelStyle = {
        fontSize: '0.8rem' // Adjust the font size as needed
    };

    // const formatYAxisTick = (value: number) => {
    //     return numeral(value).format('0a'); // Formats the tick value
    // };

    const formatDate = (date: string) => {
        return moment(date, 'YY-MM-DD').format('DD-MMM-YY');
    };

    return (
        <ResponsiveContainer width="100%" height={400}>
            <BarChart
                height={300}
                data={transformedData}
                stackOffset="expand"
                barCategoryGap={0}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="DATE" tick={{ style: axisLabelStyle }} tickFormatter={formatDate} />
                <YAxis tick={{ style: axisLabelStyle }} tickFormatter={toPercent} />
                <Tooltip
                    formatter={(value: number, name, entry) => {
                        // Calculate the total value for the current group
                        const total = Object.keys(entry.payload)
                            .filter(key => key !== 'DATE')
                            .reduce((acc, key) => acc + parseFloat(entry.payload[key] || '0'), 0);

                        // Return the formatted percentage
                        return getPercent(value, total);
                    }}
                />
                <Legend />
                <Bar key='Newly Active Deployer' dataKey='Newly Active Deployer' stackId="a" fill="#8884d8" />
                <Bar key='Returning Deployer' dataKey='Returning Deployer' stackId="a" fill="#82ca9d" />
            </BarChart>
        </ResponsiveContainer>
    );
};

export default StackedReturningChart;