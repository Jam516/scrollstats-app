"use client";
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import numeral from 'numeral';
import moment from 'moment';

type DataItem = {
    DATE: string;
    PROJECT: string;
    NUM_UNIQUE_WALLETS?: number;
    NUM_TRANSACTIONS?: number;
};

type DataKey = 'NUM_UNIQUE_WALLETS' | 'NUM_TRANSACTIONS';

type StackedBarChartProps = {
    data: DataItem[];
};

const formatDate = (date: string) => {
    return moment(date, 'YY-MM-DD').format('DD-MMM-YY');
};

const predefinedColors = ['#264653', '#DDD1C7', '#EF6461', '#E9C46A', '#896A67', '#F4A261', '#823038', '#E76F51', '#1E000E', '#D1345B', '#2A9D8F'];
const specificProjectColors: Record<string, string> = {
    'Other': '#9C9990',
    'ETH transfer': '#90C2E7',
    // CAB0F9 E8F8FA 2c2f33
    'USDC': '#3454D1',
    'Ambient': '#a982ed',
    'USDT': '#2a9d8f',
    'Scroll Bridge': '#D1345B',
};

const StackedBarChart: React.FC<StackedBarChartProps> = ({ data }) => {
    // Determine the key to use (NUM_UNIQUE_WALLETS or NUM_TRANSACTIONS)
    const keyToUse: DataKey = data[0] && data[0].NUM_UNIQUE_WALLETS !== undefined ? 'NUM_UNIQUE_WALLETS' : 'NUM_TRANSACTIONS';

    // Group and transform the data for the chart
    const transformData = (data: DataItem[], keyToUse: DataKey): any[] => {
        const groupedData: { [key: string]: any } = {};

        data.forEach(item => {
            // Initialize the date object if it doesn't exist
            if (!groupedData[item.DATE]) {
                groupedData[item.DATE] = { DATE: item.DATE };
            }

            // Assign the value for each project
            groupedData[item.DATE][item.PROJECT] = item[keyToUse] || 0;
        });

        return Object.values(groupedData);
    };

    const transformedData = transformData(data, keyToUse);

    // Extract unique project names for creating bars
    const projects = Array.from(new Set(data.map(item => item.PROJECT)));

    const axisLabelStyle = {
        fontSize: '0.8rem' // Adjust the font size as needed
    };

    const formatYAxisTick = (value: number) => {
        return numeral(value).format('0a'); // Formats the tick value
    };

    // Map projects to predefined colors
    const projectColors = projects.reduce((acc, project, index) => {
        acc[project] = specificProjectColors[project] || predefinedColors[index % predefinedColors.length];
        return acc;
    }, {} as { [key: string]: string });

    return (
        <ResponsiveContainer width="100%" height={400}>
            <BarChart data={transformedData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="DATE" tick={{ style: axisLabelStyle }} tickFormatter={formatDate} />
                <YAxis tick={{ style: axisLabelStyle }} tickFormatter={formatYAxisTick} />
                <Tooltip />
                {/* <Legend /> */}
                {projects.map(project => (
                    <Bar key={project} dataKey={project} stackId="a" fill={projectColors[project]} />
                ))}
            </BarChart>
        </ResponsiveContainer>
    );
};

export default StackedBarChart;
