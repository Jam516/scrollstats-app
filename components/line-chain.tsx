"use client";

import { Line, LineChart, Tooltip, Legend, ResponsiveContainer, XAxis, YAxis, CartesianGrid } from "recharts";
import moment from 'moment';

type DataEntry = {
    DATE: string;
    ARBITRUM: number;
    OPTIMISM: number;
    SCROLL: number;
};

interface SBChartProps {
    data: DataEntry[];
    usd: boolean;
}

export function LineChainChart({ data, usd }: SBChartProps) {

    const axisLabelStyle = {
        fontSize: '0.8rem' // Adjust the font size as needed
    };

    const formatDate = (date: string) => {
        return moment(date, 'YY-MM-DD').format('DD-MMM-YY');
    };

    return (
        <ResponsiveContainer width="100%" height={400}>
            <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                    dataKey='DATE'
                    tick={{ style: axisLabelStyle }}
                    tickFormatter={formatDate}
                />
                <YAxis
                    tick={{ style: axisLabelStyle }}
                    tickFormatter={(value) =>
                        usd ? `$${value.toLocaleString()}` : value.toLocaleString()
                    }
                />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="ARBITRUM" stroke="#0C285C" />
                <Line type="monotone" dataKey="OPTIMISM" stroke="#FF0420" />
                <Line type="monotone" dataKey="SCROLL" stroke="#FAC748" />
            </LineChart>
        </ResponsiveContainer>
    );
}
