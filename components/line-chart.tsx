"use client";
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

type DataItem = {
    DATE: string;
    ACTIVE_WALLETS?: number;
    TRANSACTIONS?: number;
};

interface LineChartProps {
    data: DataItem[];
}

const LChart: React.FC<LineChartProps> = ({ data }) => {
    // Determine the key for the data (either ACTIVE_WALLETS or TRANSACTIONS)
    const dataKey = data[0]?.ACTIVE_WALLETS !== undefined ? 'ACTIVE_WALLETS' : 'TRANSACTIONS';

    return (
        <ResponsiveContainer width="100%" height={300}>
            <LineChart
                width={500}
                height={300}
                data={data}
                margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                }}
            >
                <XAxis dataKey="DATE" />
                <YAxis />
                <Tooltip />
                {/* <Legend /> */}
                <Line type="monotone" dataKey={dataKey} stroke="#8884d8" activeDot={{ r: 8 }} />
            </LineChart>
        </ResponsiveContainer>
    );
};

export default LChart;