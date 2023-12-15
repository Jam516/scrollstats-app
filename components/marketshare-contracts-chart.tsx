"use client";
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import numeral from 'numeral';
import moment from 'moment';

type DataItem = {
    DATE: string;
    PROJECT: string;
    ETH_FEES?: number;
    NUM_TRANSACTIONS?: number;
};

type DataKey = 'ETH_FEES' | 'NUM_TRANSACTIONS';

type MSChartProps = {
    data: DataItem[];
};

const formatDate = (date: string) => {
    return moment(date, 'YY-MM-DD').format('DD-MMM-YY');
};

const predefinedColors = ['#896A67', '#264653', '#DDD1C7', '#EF6461', '#E9C46A', '#F4A261', '#823038', '#E76F51', '#1E000E', '#f16f9b', '#36eac2', '#39400b', '#4b2640'];
const specificProjectColors: Record<string, string> = {
    'Other': '#9C9990',
    'ETH transfer': '#90C2E7',
    'USDC': '#3454D1',
    'Ambient': '#a982ed',
    'USDT': '#2a9d8f',
    'Rhino.fi': '#D1345B',
    'SyncSwap': '#7871BA'
};

const toPercent = (decimal: number) => `${(decimal * 100).toLocaleString()}%`;

const getPercent = (value: number, total: number) => {
    const ratio = total > 0 ? value / total : 0;

    return toPercent(ratio);
};

const MSBarChart: React.FC<MSChartProps> = ({ data }) => {
    const keyToUse: DataKey = data[0] && data[0].ETH_FEES !== undefined ? 'ETH_FEES' : 'NUM_TRANSACTIONS';

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
        fontSize: '0.8rem'
    };

    // Sort the projects by the sum of their values
    projects.sort((a, b) => {
        const sumA = data.reduce((acc, item) => acc + (item.PROJECT === a ? item[keyToUse] || 0 : 0), 0);
        const sumB = data.reduce((acc, item) => acc + (item.PROJECT === b ? item[keyToUse] || 0 : 0), 0);
        return sumB - sumA;
    });

    // Map projects to predefined colors
    const projectColors = projects.reduce((acc, project, index) => {
        acc[project] = specificProjectColors[project] || predefinedColors[index % predefinedColors.length];
        return acc;
    }, {} as { [key: string]: string });

    return (
        <ResponsiveContainer width="100%" height={400}>
            <BarChart
                data={transformedData}
                stackOffset="expand"
                barCategoryGap={0}
            >
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
                {/* <Legend /> */}
                {projects.map(project => (
                    <Bar key={project} dataKey={project} stackId="a" fill={projectColors[project]} />
                ))}
            </BarChart>
        </ResponsiveContainer>
    );
};

export default MSBarChart;
